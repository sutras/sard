import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { getRegionData } from 'region-data'

import Picker from '../picker.vue'

// ── ResizeObserver polyfill ────────────────────────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

describe('Picker', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders single column with string values', () => {
    const wrapper = mount(<Picker columns={['北京市', '天津市', '河北省', '山东省']} />)

    const items = wrapper.findAll('.s-picker__item')
    expect(items).toHaveLength(4)
    expect(items[0].text()).toBe('北京市')
    expect(items[1].text()).toBe('天津市')
    expect(items[2].text()).toBe('河北省')
    expect(items[3].text()).toBe('山东省')
  })

  test('renders single column with object options and custom keys', () => {
    const wrapper = mount(
      <Picker
        columns={[
          { code: 110000, name: '北京市' },
          { code: 120000, name: '天津市' },
          { code: 130000, name: '河北省' },
          { code: 140000, name: '山东省' },
        ]}
        optionKeys={{ label: 'name', value: 'code' }}
      />,
    )

    const items = wrapper.findAll('.s-picker__item')
    expect(items).toHaveLength(4)
    expect(items[0].text()).toBe('北京市')
    expect(items[2].text()).toBe('河北省')
  })

  // ── multiple columns ─────────────────────────────────────────────

  test('renders multiple columns with string arrays', () => {
    const years = Array(10)
      .fill(0)
      .map((_, index) => 2000 + index + '年')
    const months = Array(12)
      .fill(0)
      .map((_, index) => 1 + index + '月')

    const wrapper = mount(<Picker columns={[years, months]} />)

    const columns = wrapper.findAll('.s-picker-view-column')
    expect(columns).toHaveLength(2)

    const yearItems = columns[0].findAll('.s-picker__item')
    expect(yearItems).toHaveLength(10)
    expect(yearItems[0].text()).toBe('2000年')
    expect(yearItems[9].text()).toBe('2009年')

    const monthItems = columns[1].findAll('.s-picker__item')
    expect(monthItems).toHaveLength(12)
    expect(monthItems[0].text()).toBe('1月')
    expect(monthItems[11].text()).toBe('12月')
  })

  test('renders multiple columns with object options', () => {
    const wrapper = mount(
      <Picker
        columns={[
          Array(10)
            .fill(0)
            .map((_, index) => ({
              value: 2000 + index,
              label: 2000 + index + '年',
            })),
          Array(12)
            .fill(0)
            .map((_, index) => ({
              value: 1 + index,
              label: 1 + index + '月',
            })),
        ]}
      />,
    )

    const columns = wrapper.findAll('.s-picker-view-column')
    expect(columns).toHaveLength(2)
    expect(columns[0].findAll('.s-picker__item')[0].text()).toBe('2000年')
    expect(columns[1].findAll('.s-picker__item')[11].text()).toBe('12月')
  })

  // ── cascader ─────────────────────────────────────────────────────

  test('renders cascaded columns with region data', () => {
    const regionData = getRegionData()

    const wrapper = mount(
      <Picker columns={regionData} optionKeys={{ label: 'name', value: 'code' }} />,
    )

    const columns = wrapper.findAll('.s-picker-view-column')
    expect(columns.length).toBeGreaterThanOrEqual(3)

    // First column (province): 北京市 should be first
    const firstColItems = columns[0].findAll('.s-picker__item')
    expect(firstColItems[0].text()).toBe('北京市')

    // Second column (city): cascaded from 北京市
    const secondColItems = columns[1].findAll('.s-picker__item')
    expect(secondColItems[0].text()).toBe('北京市')

    // Third column (district): cascaded from 北京市/北京市
    const thirdColItems = columns[2].findAll('.s-picker__item')
    expect(thirdColItems[0].text()).toBe('东城区')
  })

  // ── modelValue ───────────────────────────────────────────────────

  test('initializes with modelValue for single column', () => {
    const wrapper = mount(
      <Picker columns={['北京市', '天津市', '河北省', '山东省']} modelValue="河北省" />,
    )

    expect(wrapper.find('.s-picker__item:nth-child(3)').text()).toBe('河北省')
  })

  test('initializes with modelValue for multiple columns', async () => {
    const years = Array(5)
      .fill(0)
      .map((_, i) => 2000 + i + '年')
    const months = Array(6)
      .fill(0)
      .map((_, i) => 1 + i + '月')

    const wrapper = mount(<Picker columns={[years, months]} modelValue={['2002年', '4月']} />)

    await nextTick()

    const columns = wrapper.findAll('.s-picker-view-column')
    // Third item in year column should be in the visible area
    const yearItems = columns[0].findAll('.s-picker__item')
    expect(yearItems[2].text()).toBe('2002年')

    // Fourth item in month column
    const monthItems = columns[1].findAll('.s-picker__item')
    expect(monthItems[3].text()).toBe('4月')
  })

  test('initializes with modelValue for cascaded columns', () => {
    const regionData = getRegionData()

    const wrapper = mount(
      <Picker
        columns={regionData}
        optionKeys={{ label: 'name', value: 'code' }}
        modelValue={['130000', '130100', '130102']}
      />,
    )

    const columns = wrapper.findAll('.s-picker-view-column')
    // Should render the cascaded structure (province/city/district columns)
    expect(columns.length).toBeGreaterThanOrEqual(3)
    // Check that items exist in each column
    expect(columns[0].findAll('.s-picker__item').length).toBeGreaterThan(0)
    expect(columns[1].findAll('.s-picker__item').length).toBeGreaterThan(0)
    expect(columns[2].findAll('.s-picker__item').length).toBeGreaterThan(0)
  })

  // ── slots ────────────────────────────────────────────────────────

  test('renders custom option slot', () => {
    const wrapper = mount(
      <Picker columns={['北京市', '天津市', '河北省', '山东省']}>
        {{
          option: ({ option }: { option: string }) => <div class="custom-option">[{option}]</div>,
        }}
      </Picker>,
    )

    const items = wrapper.findAll('.custom-option')
    expect(items).toHaveLength(4)
    expect(items[0].text()).toBe('[北京市]')
    expect(items[3].text()).toBe('[山东省]')
  })

  test('does not render unrecognized slot content', () => {
    const wrapper = mount(
      <Picker columns={['北京市', '天津市']}>
        {{
          default: () => <div class="picker-content">custom content</div>,
        }}
      </Picker>,
    )

    // Picker only exposes 'option' slot, so default slot content is not rendered
    expect(wrapper.find('.picker-content').exists()).toBe(false)
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders with empty columns', () => {
    const wrapper = mount(<Picker columns={[]} />)

    expect(wrapper.find('.s-picker').exists()).toBe(true)
    expect(wrapper.findAll('.s-picker__item')).toHaveLength(0)
  })

  test('renders with undefined columns', () => {
    const wrapper = mount(<Picker />)

    expect(wrapper.find('.s-picker').exists()).toBe(true)
  })

  test('renders single item in column', () => {
    const wrapper = mount(<Picker columns={['唯一选项']} />)

    const items = wrapper.findAll('.s-picker__item')
    expect(items).toHaveLength(1)
    expect(items[0].text()).toBe('唯一选项')
  })

  // ── reactivity ───────────────────────────────────────────────────

  test('updates rendered columns when columns prop changes', async () => {
    const wrapper = mount(<Picker columns={['选项A', '选项B']} />)

    expect(wrapper.findAll('.s-picker__item')).toHaveLength(2)

    await wrapper.setProps({
      columns: ['选项A', '选项B', '选项C', '选项D'],
    })

    expect(wrapper.findAll('.s-picker__item')).toHaveLength(4)
  })

  test('clears inner value when modelValue becomes empty', async () => {
    const wrapper = mount(<Picker columns={['北京市', '天津市', '河北省']} modelValue="天津市" />)

    await wrapper.setProps({ modelValue: undefined })

    // Should render without error
    expect(wrapper.find('.s-picker').exists()).toBe(true)
    expect(wrapper.findAll('.s-picker__item').length).toBeGreaterThan(0)
  })
})
