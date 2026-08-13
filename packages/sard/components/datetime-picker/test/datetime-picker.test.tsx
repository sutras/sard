import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import DatetimePicker from '../datetime-picker.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

describe('DatetimePicker', () => {
  test('renders clamped yMd value as picker items', async () => {
    const wrapper = mount(
      <DatetimePicker
        type="yMd"
        modelValue={new Date(2024, 0, 25)}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
      />,
    )

    expect(
      wrapper
        .findAll('.s-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024年01月25日')
  })

  test('renders different type combinations with current zero-filled labels', async () => {
    const wrapper = mount(
      <DatetimePicker
        type="hms"
        modelValue={new Date(2024, 0, 25, 9, 30, 24)}
        min={new Date(2024, 0, 25, 9, 30, 24)}
        max={new Date(2024, 0, 25, 9, 30, 24)}
      />,
    )

    expect(
      wrapper
        .findAll('.s-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('09时30分24秒')

    const wrapper2 = mount(
      <DatetimePicker
        type="Mdh"
        modelValue={new Date(2024, 0, 25, 9)}
        min={new Date(2024, 0, 25, 9)}
        max={new Date(2024, 0, 25, 9)}
      />,
    )

    expect(
      wrapper2
        .findAll('.s-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('01月25日09时')
  })

  test('filter clamps the rendered day options to the first allowed value within range', async () => {
    const wrapper = mount(
      <DatetimePicker
        modelValue={new Date(2024, 0, 25)}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 26)}
        filter={(letter, value) => {
          if (letter === 'd') {
            return value % 2 === 0
          }
          return true
        }}
      />,
    )

    expect(
      wrapper
        .findAll('.s-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024年01月26日')
  })

  test('formatter overrides default translated labels per column', async () => {
    const wrapper = mount(
      <DatetimePicker
        modelValue={new Date(2024, 0, 25)}
        min={new Date(2024, 0, 25)}
        max={new Date(2024, 0, 25)}
        formatter={(letter, option) => {
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

    expect(
      wrapper
        .findAll('.s-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024year1month25day')
  })
})
