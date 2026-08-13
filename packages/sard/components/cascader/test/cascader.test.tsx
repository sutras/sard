import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import Cascader from '../cascader.vue'
import { getRegionData } from 'region-data'

// ── ResizeObserver polyfill ────────────────────────────────────────

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = () => {}
}

// ── helpers ────────────────────────────────────────────────────────

function findCheckedOptions(wrapper: ReturnType<typeof mount>) {
  return wrapper
    .findAll('.s-cascader__option')
    .filter((el) => el.find('.s-checkbox--checked').exists())
}

describe('Cascader', () => {
  const regionData = getRegionData()

  // ── basic single selection ──────────────────────────────────────

  test('basic single selection navigation', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    expect(wrapper.findAll('.s-cascader__option.is-selected').map((item) => item.text())).toEqual([
      '广东省',
      '广州市',
      '白云区',
    ])

    // Switch to a sibling district
    await wrapper
      .find('.s-cascader__pane:last-child .s-cascader__option:nth-child(4)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(440106)

    expect(wrapper.findAll('.s-cascader__option.is-selected').map((item) => item.text())).toEqual([
      '广东省',
      '广州市',
      '天河区',
    ])

    // Switch to a different province
    await wrapper
      .find('.s-cascader__pane:first-child .s-cascader__option:nth-child(3)')
      .trigger('click')

    expect(wrapper.findAll('.s-cascader__option.is-selected').map((item) => item.text())).toEqual([
      '河北省',
    ])

    // Select city
    await wrapper
      .find('.s-cascader__pane:nth-child(2) .s-cascader__option:nth-child(1)')
      .trigger('click')

    expect(wrapper.findAll('.s-cascader__option.is-selected').map((item) => item.text())).toEqual([
      '河北省',
      '石家庄市',
    ])

    // Select district
    await wrapper
      .find('.s-cascader__pane:nth-child(3) .s-cascader__option:nth-child(2)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![1][0]).toBe(130104)

    expect(wrapper.findAll('.s-cascader__option.is-selected').map((item) => item.text())).toEqual([
      '河北省',
      '石家庄市',
      '桥西区',
    ])

    // Clear value
    await wrapper.setProps({ modelValue: undefined })

    expect(wrapper.findAll('.s-cascader__option.is-selected').length).toBe(0)
  })

  test('emits change event alongside update:modelValue', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    await wrapper
      .find('.s-cascader__pane:last-child .s-cascader__option:nth-child(4)')
      .trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0][0]).toBe(440106)
  })

  // ── disabled ─────────────────────────────────────────────────────

  test('disabled options cannot be clicked', async () => {
    interface Option {
      label: string
      value: string
      disabled: boolean
      children?: Option[]
    }

    const options: Option[] = Array(10)
      .fill(0)
      .map((_, i) => ({
        label: `label${i}`,
        value: `${i}`,
        disabled: i < 3,
        children: Array(10)
          .fill(0)
          .map((_, j) => ({
            label: `label${i}-label${j}`,
            value: `${i}-${j}`,
            disabled: j < 3,
          })),
      }))

    const wrapper = mount(<Cascader options={options} />)

    // First option should be disabled
    expect(
      wrapper.find('.s-cascader__pane:nth-child(1) .s-cascader__option:nth-child(1)').classes(),
    ).toContain('is-disabled')

    // Fourth option should NOT be disabled
    expect(
      wrapper.find('.s-cascader__pane:nth-child(1) .s-cascader__option:nth-child(4)').classes(),
    ).not.toContain('is-disabled')

    // Clicking a disabled option should not open a new pane
    await wrapper
      .find('.s-cascader__pane:nth-child(1) .s-cascader__option:nth-child(1)')
      .trigger('click')

    expect(wrapper.findAll('.s-cascader__pane').length).toBe(1)

    // Clicking an enabled option should open a new pane
    await wrapper
      .find('.s-cascader__pane:nth-child(1) .s-cascader__option:nth-child(4)')
      .trigger('click')

    expect(wrapper.findAll('.s-cascader__pane').length).toBe(2)
  })

  // ── async / lazy load ────────────────────────────────────────────

  test('select event fires on option click', async () => {
    const onSelectSpy = vi.fn<() => void>()

    const options = [{ label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] }]

    const wrapper = mount(<Cascader options={options} onSelect={onSelectSpy} />)

    await wrapper
      .find('.s-cascader__pane:first-child .s-cascader__option:nth-child(1)')
      .trigger('click')

    expect(onSelectSpy).toHaveBeenCalled()
  })

  // ── slot ─────────────────────────────────────────────────────────

  test('top slot receives correct tabIndex', async () => {
    const wrapper = mount(
      <Cascader options={regionData} optionKeys={{ label: 'name', value: 'code' }}>
        {{
          top: ({ tabIndex }: { tabIndex: number }) => <div class="box">{tabIndex}</div>,
        }}
      </Cascader>,
    )

    expect(wrapper.find('.box').text()).toBe('0')

    await wrapper
      .find('.s-cascader__pane:nth-child(1) .s-cascader__option:nth-child(1)')
      .trigger('click')

    expect(wrapper.find('.box').text()).toBe('1')
  })

  // ── multiple selection ──────────────────────────────────────────

  test('multiple selection and toggle', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={[440106, 440111]}
      />,
    )

    // Initial checked options
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual(['天河区', '白云区'])

    // Check another district
    await wrapper
      .find('.s-cascader__pane:last-child .s-cascader__option:nth-child(3)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual([440105, 440106, 440111])
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual([
      '海珠区',
      '天河区',
      '白云区',
    ])

    // Uncheck a district
    await wrapper
      .find('.s-cascader__pane:last-child .s-cascader__option:nth-child(4)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![1][0]).toEqual([440105, 440111])
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual(['海珠区', '白云区'])

    // Check parent (should select all children)
    await wrapper
      .find(
        '.s-cascader__pane:nth-child(2) .s-cascader__option:nth-child(1) .s-cascader__selection',
      )
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![2][0]).toEqual([
      440103, 440104, 440105, 440106, 440111, 440112, 440113, 440114, 440115, 440117, 440118,
    ])

    // Clear value
    await wrapper.setProps({ modelValue: undefined })

    expect(findCheckedOptions(wrapper).length).toBe(0)
  })

  test('multiple allLevels emits full path values', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        allLevels={true}
        modelValue={[[440106], [440111]]}
      />,
    )

    // Initial
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual(['天河区', '白云区'])

    // Check another district
    await wrapper
      .find('.s-cascader__pane:last-child .s-cascader__option:nth-child(3)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual([
      [440000, 440100, 440105],
      [440000, 440100, 440106],
      [440000, 440100, 440111],
    ])
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual([
      '海珠区',
      '天河区',
      '白云区',
    ])
  })

  test('multiple check-strictly allows parent selection', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        checkStrictly={true}
        modelValue={[440106, 440111]}
      />,
    )

    // Initial
    expect(findCheckedOptions(wrapper).map((item) => item.text())).toEqual(['天河区', '白云区'])

    // Check parent (should add parent, not children)
    await wrapper
      .find(
        '.s-cascader__pane:nth-child(2) .s-cascader__option:nth-child(1) .s-cascader__selection',
      )
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual([440100, 440106, 440111])
  })

  // ── allLevels (single mode) ──────────────────────────────────────

  test('single allLevels emits full path array', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        allLevels={true}
      />,
    )

    // Navigate to a district
    await wrapper
      .find('.s-cascader__pane:first-child .s-cascader__option:nth-child(19)')
      .trigger('click')
    await wrapper
      .find('.s-cascader__pane:nth-child(2) .s-cascader__option:nth-child(1)')
      .trigger('click')
    await wrapper
      .find('.s-cascader__pane:nth-child(3) .s-cascader__option:nth-child(1)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual([440000, 440100, 440103])
  })

  // ── changeOnSelect ───────────────────────────────────────────────

  test('changeOnSelect emits at each level', async () => {
    const wrapper = mount(
      <Cascader
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        changeOnSelect={true}
      />,
    )

    // Click province — should emit
    await wrapper
      .find('.s-cascader__pane:first-child .s-cascader__option:nth-child(19)')
      .trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // ── empty / edge cases ───────────────────────────────────────────

  test('renders with empty options', () => {
    const wrapper = mount(<Cascader options={[]} />)

    expect(wrapper.find('.s-cascader').exists()).toBe(true)
    expect(wrapper.findAll('.s-cascader__option').length).toBe(0)
  })

  test('disabled option does not emit', async () => {
    const options = [
      {
        label: 'A',
        value: 'a',
        disabled: true,
        children: [{ label: 'A1', value: 'a1' }],
      },
    ]

    const wrapper = mount(<Cascader options={options} />)

    await wrapper.find('.s-cascader__option:nth-child(1)').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
