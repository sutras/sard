import { describe, expect, test, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import CascaderInput from '../cascader-input.vue'
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

function getInputValue(wrapper: ReturnType<typeof mount>): string {
  return wrapper.find('.s-input').find('input').element.value
}

function getTextareaValue(wrapper: ReturnType<typeof mount>): string {
  return wrapper.find('.s-input').find('textarea').element.value
}

async function clickSeal(wrapper: ReturnType<typeof mount>) {
  await wrapper.find('.s-popout-input__seal').trigger('click')
  await nextTick()
}

// ── cleanup between tests ──────────────────────────────────────────

afterEach(() => {
  // Remove any teleported popup content left in document body
  document.body.innerHTML = ''
})

// ── tests ──────────────────────────────────────────────────────────

describe('CascaderInput', () => {
  const regionData = getRegionData()

  // ── basic rendering & value display ──────────────────────────────

  test('renders with modelValue and displays label path', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省/广州市/白云区')
  })

  test('renders with placeholder when no value', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        placeholder="请选择地区"
      />,
    )

    expect(wrapper.find('.s-input').find('input').attributes('placeholder')).toBe('请选择地区')
  })

  test('renders with empty input when modelValue is undefined', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={undefined}
      />,
    )

    expect(getInputValue(wrapper)).toBe('')
  })

  test('renders with empty input when modelValue is empty string', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={''}
      />,
    )

    expect(getInputValue(wrapper)).toBe('')
  })

  // ── visible / popout toggle ──────────────────────────────────────

  test('shows cascader popout in document body when visible prop set initially', async () => {
    mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        visible={true}
      />,
    )

    await nextTick()
    expect(document.querySelector('.s-cascader')).not.toBeNull()
  })

  test('clicking seal opens popout and emits update:visible', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    // Click the seal element to open popout
    await clickSeal(wrapper)

    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])
  })

  test('clicking seal toggles cascader visibility', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        visible={true}
      />,
    )

    await nextTick()
    expect(document.querySelector('.s-cascader')).not.toBeNull()

    await wrapper.setProps({ visible: false })
    await nextTick()
    const cascader = document.querySelector('.s-cascader')
    // After visible=false, Popup hides with v-show (display:none on parent)
    expect(
      cascader === null || (cascader as HTMLElement).closest('[style*="display: none"]') !== null,
    ).toBe(true)
  })

  // ── modelValue updates ───────────────────────────────────────────

  test('updates input display when modelValue changes', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省/广州市/白云区')

    await wrapper.setProps({ modelValue: 410305 })
    expect(getInputValue(wrapper)).toBe('河南省/洛阳市/涧西区')
  })

  test('clears input when modelValue becomes undefined', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省/广州市/白云区')

    await wrapper.setProps({ modelValue: undefined })
    expect(getInputValue(wrapper)).toBe('')
  })

  test('clears input when modelValue becomes empty array', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    await wrapper.setProps({ modelValue: [] })
    expect(getInputValue(wrapper)).toBe('')
  })

  // ── clearable ────────────────────────────────────────────────────

  test('renders clear button when clearable and has value', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        clearable={true}
      />,
    )

    await nextTick()

    // Clear button should be visible when there is a value
    const clearIcon = wrapper.find('.s-input__clear')
    expect(clearIcon.exists()).toBe(true)
    expect(clearIcon.isVisible()).toBe(true)
  })

  test('does not render clear button when clearable is false', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        clearable={false}
      />,
    )

    expect(wrapper.find('.s-input__clear').exists()).toBe(false)
  })

  // ── disabled ─────────────────────────────────────────────────────

  test('renders disabled input', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        disabled={true}
      />,
    )

    const input = wrapper.find('.s-input').find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  test('does not open popout when disabled and seal clicked', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        disabled={true}
      />,
    )

    await clickSeal(wrapper)
    expect(document.querySelector('.s-cascader')).toBeNull()
  })

  // ── readonly ─────────────────────────────────────────────────────

  test('renders readonly input', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        readonly={true}
      />,
    )

    const input = wrapper.find('.s-input').find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })

  // ── select event ─────────────────────────────────────────────────

  test('emits select event when navigating cascader options', async () => {
    const onSelect = vi.fn<() => void>()

    mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        visible={true}
        onSelect={onSelect}
      />,
    )

    await nextTick()

    const firstOption = document.querySelector(
      '.s-cascader__pane:first-child .s-cascader__option:nth-child(1)',
    )
    expect(firstOption).not.toBeNull()
    ;(firstOption as HTMLElement).click()
    await nextTick()

    expect(onSelect).toHaveBeenCalled()
  })

  // ── confirm event ────────────────────────────────────────────────

  test('emits confirm event from popout', async () => {
    const onConfirm = vi.fn<() => void>()

    mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        visible={true}
        onConfirm={onConfirm}
      />,
    )

    await nextTick()

    const confirmBtn = document.querySelector('.s-popout__button-wrap--end .s-button')
    expect(confirmBtn).not.toBeNull()
    ;(confirmBtn as HTMLElement).click()
    await nextTick()

    expect(onConfirm).toHaveBeenCalled()
  })

  // ── slots: prepend / append / arrow ──────────────────────────────

  test('renders prepend slot content', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      >
        {{
          prepend: () => <span class="prepend-slot">前缀</span>,
        }}
      </CascaderInput>,
    )

    expect(wrapper.find('.prepend-slot').exists()).toBe(true)
    expect(wrapper.find('.prepend-slot').text()).toBe('前缀')
  })

  test('renders append slot content', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      >
        {{
          append: () => <span class="append-slot">后缀</span>,
        }}
      </CascaderInput>,
    )

    expect(wrapper.find('.append-slot').exists()).toBe(true)
    expect(wrapper.find('.append-slot').text()).toBe('后缀')
  })

  test('renders arrow slot content', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      >
        {{
          arrow: () => <span class="arrow-slot">▼</span>,
        }}
      </CascaderInput>,
    )

    expect(wrapper.find('.arrow-slot').exists()).toBe(true)
  })

  test('renders top slot inside cascader popout with correct tabIndex', async () => {
    mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        visible={true}
      >
        {{
          top: ({ tabIndex }: { tabIndex: number }) => <div class="top-slot">{tabIndex}</div>,
        }}
      </CascaderInput>,
    )

    await nextTick()

    const topSlot = document.querySelector('.top-slot')
    expect(topSlot).not.toBeNull()
    // tabIndex=2 because modelValue=440111 has 3 levels (0=province, 1=city, 2=district)
    expect(topSlot!.textContent).toBe('2')
  })

  // ── multiple selection ───────────────────────────────────────────

  test('displays multiple selected values in multiline textarea', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={[440106, 440111]}
      />,
    )

    const textarea = wrapper.find('.s-input').find('textarea')
    expect(textarea.exists()).toBe(true)

    const text = textarea.element.value
    expect(text).toContain('广东省/广州市/天河区')
    expect(text).toContain('广东省/广州市/白云区')
  })

  test('handles empty array in multiple mode', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={[]}
      />,
    )

    expect(getTextareaValue(wrapper)).toBe('')
  })

  test('handles undefined modelValue in multiple mode', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={undefined}
      />,
    )

    expect(getTextareaValue(wrapper)).toBe('')
  })

  // ── maxRows truncation in multiple mode ──────────────────────────

  test('truncates display with maxRows in multiple mode', async () => {
    const values = [440103, 440104, 440105, 440106, 440111, 440112, 440113, 440114]

    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={values}
        maxRows={3}
      />,
    )

    await nextTick()

    const text = getTextareaValue(wrapper)
    const lines = text.split('\n')
    expect(lines.length).toBe(4)
    expect(lines[3]).toBe('+5')
  })

  test('maxRows=-1 shows all values without truncation', async () => {
    const values = [440103, 440104, 440105, 440106, 440111]

    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={values}
        maxRows={-1}
      />,
    )

    await nextTick()

    const lines = getTextareaValue(wrapper).split('\n')
    expect(lines.length).toBe(values.length)
  })

  // ── allLevels single mode ────────────────────────────────────────

  test('displays full path when allLevels is true (single mode)', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        allLevels={true}
        modelValue={[440000, 440100, 440111]}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省/广州市/白云区')
  })

  // ── allLevels multiple mode ──────────────────────────────────────

  test('displays full paths when allLevels is true (multiple mode)', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        allLevels={true}
        modelValue={[
          [440000, 440100, 440106],
          [440000, 440100, 440111],
        ]}
      />,
    )

    const text = getTextareaValue(wrapper)
    expect(text).toContain('广东省/广州市/天河区')
    expect(text).toContain('广东省/广州市/白云区')
  })

  // ── fieldKeys alias ──────────────────────────────────────────────

  test('accepts fieldKeys as alias for optionKeys', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        fieldKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省/广州市/白云区')
  })

  // ── fallback: display raw value when no matching option ──────────

  test('displays raw value when options do not match', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={999999}
      />,
    )

    expect(getInputValue(wrapper)).toBe('999999')
  })

  test('displays raw array value when options do not match (allLevels)', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        allLevels={true}
        modelValue={[999, 888, 777]}
      />,
    )

    // When no matching options found, getValueDisplay joins array without separator
    expect(getInputValue(wrapper)).toBe('999888777')
  })

  test('displays raw array values when options do not match (multiple)', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        modelValue={[999999, 888888]}
      />,
    )

    const text = getTextareaValue(wrapper)
    expect(text).toContain('999999')
    expect(text).toContain('888888')
  })

  // ── empty options ────────────────────────────────────────────────

  test('renders with empty options array and displays raw value', () => {
    const wrapper = mount(<CascaderInput options={[]} modelValue={440111} />)

    expect(getInputValue(wrapper)).toBe('440111')
  })

  test('renders with empty options and empty modelValue', () => {
    const wrapper = mount(<CascaderInput options={[]} modelValue={undefined} />)

    expect(getInputValue(wrapper)).toBe('')
  })

  // ── changeOnSelect ───────────────────────────────────────────────

  test('supports changeOnSelect prop', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        changeOnSelect={true}
        modelValue={440000}
      />,
    )

    expect(getInputValue(wrapper)).toBe('广东省')
  })

  // ── valueOnClear ─────────────────────────────────────────────────

  test('renders clear button when valueOnClear is provided', async () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        clearable={true}
        valueOnClear={() => 'cleared'}
      />,
    )

    await nextTick()

    const clearIcon = wrapper.find('.s-input__clear')
    expect(clearIcon.exists()).toBe(true)
    expect(clearIcon.isVisible()).toBe(true)
  })

  // ── loading ──────────────────────────────────────────────────────

  test('shows loading state', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        loading={true}
      />,
    )

    expect(wrapper.find('.s-popout-input__loading').exists()).toBe(true)
  })

  // ── inputProps passthrough ───────────────────────────────────────

  test('passes inputProps to underlying input', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={440111}
        inputProps={{ borderless: true }}
      />,
    )

    expect(wrapper.find('.s-input--borderless').exists()).toBe(true)
  })

  // ── hintText ─────────────────────────────────────────────────────

  test('renders with hintText', () => {
    const wrapper = mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        hintText="请选择"
      />,
    )

    // hintText is passed through to cascader
    expect(wrapper.find('.s-popout-input').exists()).toBe(true)
  })

  // ── checkStrictly in multiple mode ───────────────────────────────

  test('shows popout with checkStrictly in multiple mode', async () => {
    mount(
      <CascaderInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        multiple={true}
        checkStrictly={true}
        modelValue={[440106, 440111]}
        visible={true}
      />,
    )

    await nextTick()

    const checked = document.querySelectorAll('.s-cascader__option .s-checkbox--checked')
    expect(checked.length).toBeGreaterThan(0)
  })
})
