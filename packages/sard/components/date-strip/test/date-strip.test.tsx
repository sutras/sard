import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import DateStrip from '../date-strip.vue'
import type { CalendarDay } from '../../calendar'
import type { DateStripProps } from '../common'

const flush = async () => {
  await nextTick()
  vi.runAllTimers()
  await Promise.resolve()
}

const getDayNumbers = (wrapper: ReturnType<typeof mount>) => {
  return wrapper
    .findAll('.s-date-strip__item')
    .filter((item) => !item.classes().includes('s-date-strip__item--disabled'))
    .map((item) => item.find('.s-date-strip__item-day').text())
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('DateStrip', () => {
  test('create', async () => {
    const wrapper = mount(
      <DateStrip
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 0, 5)}
        modelValue={new Date(2024, 0, 3)}
      />,
    )

    await flush()

    expect(wrapper.find('.s-date-strip').exists()).toBe(true)
    expect(wrapper.find('.s-date-strip__item--selected').exists()).toBe(true)
    expect(wrapper.find('.s-date-strip__item-day').text()).toBe('01-01')
  })

  test('multiple', async () => {
    const wrapper = mount(
      <DateStrip
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 0, 5)}
        type="multiple"
        modelValue={[new Date(2024, 0, 1), new Date(2024, 0, 4)]}
      />,
    )

    await flush()

    expect(wrapper.findAll('.s-date-strip__item--selected')).toHaveLength(2)
  })

  test('range', async () => {
    const wrapper = mount(
      <DateStrip
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 0, 7)}
        type="range"
        modelValue={[new Date(2024, 0, 2), new Date(2024, 0, 5)]}
      />,
    )

    await flush()

    expect(wrapper.findAll('.s-date-strip__item--start')).toHaveLength(1)
    expect(wrapper.findAll('.s-date-strip__item--middle')).toHaveLength(2)
    expect(wrapper.findAll('.s-date-strip__item--end')).toHaveLength(1)
  })

  test('disabled', async () => {
    const wrapper = mount(
      <DateStrip
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 0, 5)}
        disabledDate={(date: Date) => ![2, 4].includes(date.getDate())}
      />,
    )

    await flush()

    expect(getDayNumbers(wrapper)).toEqual(['01-02', '01-04'])
  })

  test('maxDays', async () => {
    const overMaxDays = vi.fn<NonNullable<DateStripProps['overMaxDays']>>()
    const wrapper = mount(
      <DateStrip
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 0, 5)}
        type="multiple"
        maxDays={2}
        overMaxDays={overMaxDays}
      />,
    )

    await flush()

    const items = wrapper.findAll('.s-date-strip__item')

    await items[0].trigger('click')
    await items[1].trigger('click')
    await items[2].trigger('click')
    await flush()

    expect(wrapper.findAll('.s-date-strip__item--selected')).toHaveLength(2)
    expect(overMaxDays).toHaveBeenCalledTimes(1)
  })

  test('formatter', async () => {
    const formatter = (day: CalendarDay) => {
      if (day.date.getDate() === 2) {
        day.bottom = '自定义'
        day.className = 'custom-day'
      }
    }

    const wrapper = mount(
      <DateStrip min={new Date(2024, 0, 1)} max={new Date(2024, 0, 3)} formatter={formatter} />,
    )

    await flush()

    expect(wrapper.find('.custom-day').exists()).toBe(true)
    expect(wrapper.find('.custom-day .s-date-strip__item-info').text()).toBe('自定义')
  })

  test('showLunar', async () => {
    const wrapper = mount(
      <DateStrip min={new Date(2024, 1, 10)} max={new Date(2024, 1, 10)} showLunar />,
    )

    await flush()

    expect(wrapper.find('.s-date-strip__item-info').text()).toBe('正月')
  })
})
