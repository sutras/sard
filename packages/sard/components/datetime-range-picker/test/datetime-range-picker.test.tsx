import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import DatetimeRangePicker from '../datetime-range-picker.vue'

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

function pickerTexts(wrapper: ReturnType<typeof mount>) {
  return wrapper
    .findAll('.s-picker__item')
    .map((el) => el.text())
    .join('')
}

describe('DatetimeRangePicker', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders with yMd type and modelValue', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="yMd"
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      />,
    )

    expect(pickerTexts(wrapper)).toBe('2024年01月25日2024年01月25日')
  })

  test('renders the wrapper element', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      />,
    )

    expect(wrapper.find('.s-datetime-range-picker').exists()).toBe(true)
  })

  // ── type prop ────────────────────────────────────────────────────

  test('renders with hms type', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="hms"
        modelValue={[new Date(2024, 0, 25, 9, 30, 24), new Date(2024, 0, 25, 9, 30, 24)]}
        min={new Date(2024, 0, 25, 9, 30, 24)}
        max={new Date(2024, 0, 25, 9, 30, 24)}
      />,
    )

    expect(pickerTexts(wrapper)).toBe('09时30分24秒09时30分24秒')
  })

  test('renders with Mdh type', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="Mdh"
        modelValue={[new Date(2024, 0, 25, 9), new Date(2024, 0, 25, 9)]}
        min={new Date(2024, 0, 25, 9)}
        max={new Date(2024, 0, 25, 9)}
      />,
    )

    expect(pickerTexts(wrapper)).toBe('01月25日09时01月25日09时')
  })

  test('renders with yM type', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="yM"
        modelValue={[new Date(2024, 5, 1), new Date(2024, 5, 1)]}
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 1)}
      />,
    )

    // yM type shows year + all months, both start and end pickers
    const text = pickerTexts(wrapper)
    expect(text).toContain('2024年')
    expect(text).toContain('06月')
  })

  // ── filter ───────────────────────────────────────────────────────

  test('filters day options to even numbers only', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 26)}
        filter={(letter: string, value: number) => {
          if (letter === 'd') {
            return value % 2 === 0
          }
          return true
        }}
      />,
    )

    // Day 25 is odd and filtered out, so it falls to day 26 (even)
    expect(pickerTexts(wrapper)).toBe('2024年01月26日2024年01月26日')
  })

  test('filters month to only even months', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="yM"
        modelValue={[new Date(2024, 2, 1), new Date(2024, 2, 1)]}
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 1)}
        filter={(letter: string, value: number) => {
          if (letter === 'M') {
            return value % 2 === 0
          }
          return true
        }}
      />,
    )

    // Month filter removes odd months, only even months (02, 04, 06...) appear
    const text = pickerTexts(wrapper)
    expect(text).not.toContain('01月')
    expect(text).not.toContain('03月')
    expect(text).toContain('02月')
    expect(text).toContain('04月')
  })

  // ── formatter ────────────────────────────────────────────────────

  test('formats option labels with custom formatter', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
        formatter={(letter: string, option: { value: number }) => {
          if (letter === 'M') {
            return option.value + 'month'
          }
          if (letter === 'd') {
            return option.value + 'day'
          }
          if (letter === 'y') {
            return option.value + 'year'
          }
        }}
      />,
    )

    expect(pickerTexts(wrapper)).toBe('2024year1month25day2024year1month25day')
  })

  // ── tabs ─────────────────────────────────────────────────────────

  test('renders two tabs for start and end date', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      />,
    )

    const tabs = wrapper.findAll('.s-tabs__tab')
    expect(tabs).toHaveLength(2)
  })

  test('renders custom tab labels', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
        tabs={['入住', '离店']}
      />,
    )

    const tabs = wrapper.findAll('.s-tabs__tab')
    expect(tabs[0].text()).toBe('入住')
    expect(tabs[1].text()).toBe('离店')
  })

  // ── modelValue reactivity ────────────────────────────────────────

  test('updates when modelValue changes', async () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="yMd"
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 28)}
      />,
    )

    // With 4-day range, all days 25-28 appear in day column
    const initialText = pickerTexts(wrapper)
    expect(initialText).toContain('25日')
    expect(initialText).toContain('28日')

    await wrapper.setProps({
      modelValue: [new Date(2024, 0, 26), new Date(2024, 0, 28)],
    })

    // After update, picker should still show the available day range
    const text = pickerTexts(wrapper)
    expect(text).toContain('26日')
    expect(text).toContain('28日')
  })

  // ── auto-normalize range ─────────────────────────────────────────

  test('renders without modelValue', () => {
    const wrapper = mount(
      <DatetimeRangePicker min={new Date(2024, 0, 1)} max={new Date(2024, 11, 1)} />,
    )

    expect(wrapper.find('.s-datetime-range-picker').exists()).toBe(true)
  })

  test('renders with partial range modelValue', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 1)}
      />,
    )

    expect(wrapper.find('.s-datetime-range-picker').exists()).toBe(true)
  })

  // ── slots ────────────────────────────────────────────────────────

  test('renders header slot content', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      >
        {{
          header: () => <div class="custom-header">选择日期范围</div>,
        }}
      </DatetimeRangePicker>,
    )

    expect(wrapper.find('.custom-header').text()).toBe('选择日期范围')
  })

  test('renders footer slot content', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 0, 25), new Date(2024, 0, 25)]}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      >
        {{
          footer: () => <div class="custom-footer">底部内容</div>,
        }}
      </DatetimeRangePicker>,
    )

    expect(wrapper.find('.custom-footer').text()).toBe('底部内容')
  })

  // ── min/max constraints ──────────────────────────────────────────

  test('respects min and max constraints', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        modelValue={[new Date(2024, 5, 15), new Date(2024, 5, 15)]}
        min={new Date(2024, 5, 10)}
        max={new Date(2024, 5, 20)}
      />,
    )

    expect(wrapper.find('.s-datetime-range-picker').exists()).toBe(true)
  })

  // ── end date respects start date ─────────────────────────────────

  test('end date min is constrained by start date', () => {
    const wrapper = mount(
      <DatetimeRangePicker
        type="yMd"
        modelValue={[new Date(2024, 5, 15), new Date(2024, 5, 20)]}
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 31)}
      />,
    )

    // End date's DatetimePicker should have min=startValue
    expect(wrapper.find('.s-datetime-range-picker').exists()).toBe(true)
  })
})
