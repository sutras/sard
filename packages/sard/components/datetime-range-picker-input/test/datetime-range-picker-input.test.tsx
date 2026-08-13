import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import DatetimeRangePickerInput from '../datetime-range-picker-input.vue'
import DatetimeRangePickerPopout from '../../datetime-range-picker-popout/datetime-range-picker-popout.vue'

// ── ResizeObserver polyfill ────────────────────────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

// ── scrollTo polyfill ─────────────────────────────────────────────
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {}
}

describe('DatetimeRangePickerInput', () => {
  // ── basic ────────────────────────────────────────────────────────

  test('displays formatted range value', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('2024-01-25 至 2024-01-25')
  })

  test('popout is hidden by default', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    expect(wrapper.findComponent(DatetimeRangePickerPopout).props('visible')).toBe(false)
  })

  // ── visible toggle ───────────────────────────────────────────────

  test('shows popout when visible is set to true', async () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    await wrapper.setProps({ visible: true })
    expect(wrapper.findComponent(DatetimeRangePickerPopout).props('visible')).toBe(true)
  })

  // ── modelValue reactivity ────────────────────────────────────────

  test('updates input display when modelValue changes', async () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    await wrapper.setProps({
      modelValue: [new Date(2024, 1, 26), new Date(2024, 1, 26)],
    })
    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('2024-02-26 至 2024-02-26')
  })

  test('clears input display when modelValue is undefined', async () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    await wrapper.setProps({ modelValue: undefined })
    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('')
  })

  test('clears input display when modelValue is empty array', async () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    await wrapper.setProps({ modelValue: [] })
    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('')
  })

  // ── type prop ────────────────────────────────────────────────────

  test('formats value based on type', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput
        type="yMd"
        modelValue={[new Date(2024, 0, 25), new Date(2024, 1, 26)]}
      />,
    )

    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('2024-01-25 至 2024-02-26')
  })

  test('formats time type correctly', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput
        type="hms"
        modelValue={[new Date(2024, 0, 25, 9, 30, 0), new Date(2024, 0, 25, 18, 0, 0)]}
      />,
    )

    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('09:30:00 至 18:00:00')
  })

  // ── outletFormat ─────────────────────────────────────────────────

  test('uses custom outletFormat for display', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput
        type="yMd"
        outletFormat="YYYY年MM月DD日"
        modelValue={[new Date(2024, 0, 25), new Date(2024, 1, 26)]}
      />,
    )

    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('2024年01月25日 至 2024年02月26日')
  })

  // ── slots ────────────────────────────────────────────────────────

  test('renders prepend slot content', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}>
        {{
          prepend: () => <span class="custom-prepend">开始</span>,
        }}
      </DatetimeRangePickerInput>,
    )

    expect(wrapper.find('.custom-prepend').text()).toBe('开始')
  })

  test('renders append slot content', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}>
        {{
          append: () => <span class="custom-append">结束</span>,
        }}
      </DatetimeRangePickerInput>,
    )

    expect(wrapper.find('.custom-append').text()).toBe('结束')
  })

  test('renders arrow slot content', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}>
        {{
          arrow: () => <span class="custom-arrow">▼</span>,
        }}
      </DatetimeRangePickerInput>,
    )

    expect(wrapper.find('.custom-arrow').text()).toBe('▼')
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders without modelValue', () => {
    const wrapper = mount(<DatetimeRangePickerInput />)

    const input = wrapper.find('.s-input input').element as HTMLInputElement
    expect(input.value).toBe('')
  })

  test('renders with single element array', () => {
    const wrapper = mount(<DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25)]} />)

    expect(wrapper.find('.s-input').exists()).toBe(true)
  })

  test('wrapper element has correct class', () => {
    const wrapper = mount(
      <DatetimeRangePickerInput modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]} />,
    )

    expect(wrapper.find('.s-popout-input').exists()).toBe(true)
  })
})
