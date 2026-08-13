import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Calendar from '../calendar.vue'
import { type CalendarDay } from '../common'

function today() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function dateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

describe('Calendar', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders with default props', () => {
    const wrapper = mount(<Calendar />)

    expect(wrapper.find('.s-calendar').exists()).toBe(true)
    expect(wrapper.find('.s-calendar__header').exists()).toBe(true)
    expect(wrapper.find('.s-calendar__week').exists()).toBe(true)
  })

  test('renders week headers based on weekStartsOn', () => {
    const wrapper0 = mount(<Calendar weekStartsOn={0} />)
    expect(wrapper0.find('.s-calendar__week-item').text()).toBe('日')

    const wrapper2 = mount(<Calendar weekStartsOn={2} />)
    expect(wrapper2.find('.s-calendar__week-item').text()).toBe('二')
  })

  // ── single selection ─────────────────────────────────────────────

  test('selects and deselects a single date', async () => {
    const now = today()
    const wrapper = mount(<Calendar modelValue={new Date(now.getFullYear(), 0, 1)} />)

    let selected = wrapper.find('.s-calendar__day--selected')
    expect(selected.exists()).toBe(true)
    expect(selected.text()).toContain('1')

    await wrapper.setProps({ modelValue: undefined })
    selected = wrapper.find('.s-calendar__day--selected')
    expect(selected.exists()).toBe(false)

    await wrapper.setProps({ modelValue: new Date(now.getFullYear(), 0, 15) })
    selected = wrapper.find('.s-calendar__day--selected')
    expect(selected.exists()).toBe(true)
    expect(selected.text()).toContain('15')
  })

  test('emits update:modelValue and change on day click', async () => {
    const wrapper = mount(<Calendar />)

    const day = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without'),
      )

    await day!.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  // ── multiple selection ───────────────────────────────────────────

  test('multiple selection renders selected days', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        type="multiple"
        modelValue={[
          new Date(now.getFullYear(), 0, 1),
          new Date(now.getFullYear(), 0, 3),
          new Date(now.getFullYear(), 0, 9),
        ]}
      />,
    )

    expect(
      wrapper.findAll('.s-calendar__day--selected').map((item) => item.text().replace(/\D/g, '')),
    ).toEqual(['1', '3', '9'])
  })

  test('multiple: toggles day on click', async () => {
    const now = today()
    const wrapper = mount(
      <Calendar type="multiple" modelValue={[new Date(now.getFullYear(), 0, 1)]} />,
    )

    // Click day 1 to deselect
    const day1 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '1',
      )
    await day1!.trigger('click')

    const emitValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date[]
    expect(emitValue).toEqual([])
  })

  test('multiple: respects maxDays limit', () => {
    const now = today()
    const overMaxDays = vi.fn<() => void>()
    const wrapper = mount(
      <Calendar
        type="multiple"
        maxDays={2}
        modelValue={[new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 0, 3)]}
        overMaxDays={overMaxDays}
      />,
    )

    // Click another day while at max
    const day5 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '5',
      )
    day5!.trigger('click')

    // overMaxDays should be called, value should not change
    expect(overMaxDays).toHaveBeenCalled()
  })

  // ── range selection ──────────────────────────────────────────────

  test('range selection renders start/middle/end days', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        type="range"
        modelValue={[new Date(now.getFullYear(), 0, 4), new Date(now.getFullYear(), 0, 11)]}
      />,
    )

    expect(
      wrapper
        .findAll('.s-calendar__day--start, .s-calendar__day--middle, .s-calendar__day--end')
        .map((item) => item.text().replace(/\D/g, '')),
    ).toEqual(['4', '5', '6', '7', '8', '9', '10', '11'])
  })

  test('range: same day selection when allowSameDay is false', async () => {
    const now = today()
    const wrapper = mount(
      <Calendar type="range" modelValue={[new Date(now.getFullYear(), 0, 5)]} />,
    )

    // Click same day again — should not complete range (allowSameDay defaults to false)
    const day5 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '5',
      )
    await day5!.trigger('click')

    // Should not emit a completed range
    const calls = wrapper.emitted('update:modelValue')
    expect(calls).toBeFalsy()
  })

  test('range: allowSameDay permits same-day range', async () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        type="range"
        allowSameDay={true}
        modelValue={[new Date(now.getFullYear(), 0, 5)]}
      />,
    )

    // First click sets start, second click on same day completes range
    const day5 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '5',
      )
    await day5!.trigger('click')

    const emitValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date[]
    expect(emitValue).toHaveLength(2)
    expect(dateStr(emitValue[0])).toBe(dateStr(emitValue[1]))
  })

  test('range: respects maxDays and calls overMaxDays', async () => {
    const now = today()
    const overMaxDays = vi.fn<() => void>()
    const wrapper = mount(
      <Calendar
        type="range"
        maxDays={5}
        modelValue={[new Date(now.getFullYear(), 0, 1)]}
        overMaxDays={overMaxDays}
      />,
    )

    // Click day 20 — exceed maxDays
    const day20 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '20',
      )
    await day20!.trigger('click')

    expect(overMaxDays).toHaveBeenCalled()
    // Should still emit a capped range
    const emitValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date[]
    const diff = (emitValue[1].getTime() - emitValue[0].getTime()) / (1000 * 60 * 60 * 24) + 1
    expect(diff).toBe(5)
  })

  test('range: clicking before start resets start date', async () => {
    const now = today()
    const wrapper = mount(
      <Calendar type="range" modelValue={[new Date(now.getFullYear(), 0, 10)]} />,
    )

    // Click day 3 (before start) — should reset start
    const day3 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '3',
      )
    await day3!.trigger('click')

    // Should not emit completed range, just resets start
    const calls = wrapper.emitted('update:modelValue')
    expect(calls).toBeFalsy()
  })

  // ── min / max ─────────────────────────────────────────────────────

  test('min and max constrain selectable days', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        min={new Date(now.getFullYear(), 0, 12)}
        max={new Date(now.getFullYear(), 0, 16)}
      />,
    )

    expect(
      wrapper
        .findAll('.s-calendar__day')
        .filter((item) => !item.classes().includes('s-calendar__day--disabled'))
        .map((item) => item.text().replace(/\D/g, '')),
    ).toEqual(['12', '13', '14', '15', '16'])
  })

  // ── disabledDate ─────────────────────────────────────────────────

  test('disabledDate filters selectable days', () => {
    const validDay = [2, 12, 22]
    const disabledDate = (date: Date) => !validDay.includes(date.getDate())

    const wrapper = mount(<Calendar disabledDate={disabledDate} />)

    expect(
      wrapper
        .findAll('.s-calendar__day')
        .filter((item) => !item.classes().includes('s-calendar__day--disabled'))
        .map((item) => Number(item.text().replace(/\D/g, ''))),
    ).toEqual(validDay)
  })

  test('disabled day does not emit on click', async () => {
    const disabledDate = (date: Date) => date.getDate() === 1

    const wrapper = mount(<Calendar disabledDate={disabledDate} />)

    const day1 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          el.classes().includes('s-calendar__day--disabled') &&
          el.text().replace(/\D/g, '') === '1',
      )

    await day1!.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // ── formatter ────────────────────────────────────────────────────

  test('formatter customizes day top and bottom text', () => {
    const formatter = (day: CalendarDay) => {
      if (day.date.getDate() === 13) {
        day.bottom = '十三'
      }
      if (day.date.getDate() === 23) {
        day.top = '二十三'
      }
    }

    const wrapper = mount(<Calendar formatter={formatter} />)

    expect(wrapper.find('.s-calendar__day-bottom').text()).toBe('十三')
    expect(wrapper.find('.s-calendar__day-top').text()).toBe('二十三')
  })

  // ── severalMonths ────────────────────────────────────────────────

  test('severalMonths renders multiple month panels', () => {
    const wrapper = mount(
      <Calendar severalMonths={true} min={new Date(2000, 0, 1)} max={new Date(2000, 2, 15)} />,
    )

    expect(wrapper.findAll('.s-calendar__month').length).toBe(3)
  })

  test('severalMonths hides prev/next toolbar', () => {
    const wrapper = mount(
      <Calendar severalMonths={true} min={new Date(2000, 0, 1)} max={new Date(2000, 2, 15)} />,
    )

    expect(wrapper.find('.s-calendar__toolbar').exists()).toBe(false)
  })

  // ── currentDate ──────────────────────────────────────────────────

  test('currentDate controls displayed month', async () => {
    const wrapper = mount(<Calendar currentDate={new Date(2023, 5, 15)} />)

    // The month title should show June 2023
    const header = wrapper.find('.s-calendar__toolbar button:nth-child(2)')
    expect(header.text()).toContain('2023')
    expect(header.text()).toContain('06')
  })

  // ── valueFormat ──────────────────────────────────────────────────

  test('valueFormat emits string values', async () => {
    const wrapper = mount(<Calendar valueFormat="YYYY-MM-DD" modelValue={new Date(2023, 0, 15)} />)

    // Click another day
    const day20 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '20',
      )
    await day20!.trigger('click')

    const emitValue = wrapper.emitted('update:modelValue')?.[0]?.[0]
    expect(emitValue).toBe('2023-01-20')
  })

  test('valueFormat with range emits string array', async () => {
    const wrapper = mount(
      <Calendar type="range" valueFormat="YYYY/MM/DD" modelValue={[new Date(2023, 0, 1)]} />,
    )

    const day10 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().replace(/\D/g, '') === '10',
      )
    await day10!.trigger('click')

    const emitValue = wrapper.emitted('update:modelValue')?.[0]?.[0] as string[]
    expect(emitValue).toEqual(['2023/01/01', '2023/01/10'])
  })

  // ── range text labels ────────────────────────────────────────────

  test('range bottom labels show start/end text', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        type="range"
        modelValue={[new Date(now.getFullYear(), 0, 5), new Date(now.getFullYear(), 0, 8)]}
      />,
    )

    const bottoms = wrapper.findAll('.s-calendar__day-bottom')
    expect(bottoms.length).toBeGreaterThanOrEqual(2)
  })

  test('custom startDateText/endDateText/sameDateText', async () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        type="range"
        allowSameDay={true}
        startDateText="开始"
        endDateText="结束"
        sameDateText="起止"
        modelValue={[new Date(now.getFullYear(), 0, 5)]}
      />,
    )

    // Complete range on same day
    const day5 = wrapper
      .findAll('.s-calendar__day')
      .find(
        (el) =>
          !el.classes().includes('s-calendar__day--disabled') &&
          !el.classes().includes('s-calendar__day--without') &&
          el.text().includes('5'),
      )
    await day5!.trigger('click')

    await nextTick()

    // After same-day range, the bottom should show 起止
    const bottom = wrapper.find('.s-calendar__day-bottom')
    expect(bottom.exists()).toBe(true)
  })

  // ── navigation ───────────────────────────────────────────────────

  test('prev/next month navigation buttons exist in single-month mode', () => {
    const wrapper = mount(<Calendar />)

    expect(wrapper.find('.s-calendar__prev-month').exists()).toBe(true)
    expect(wrapper.find('.s-calendar__next-month').exists()).toBe(true)
  })

  test('prev month button is disabled when at min date', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        min={new Date(now.getFullYear(), now.getMonth(), 1)}
        currentDate={new Date(now.getFullYear(), now.getMonth(), 1)}
      />,
    )

    const prevBtn = wrapper.find('.s-calendar__prev-month')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  test('next month button is disabled when at max date', () => {
    const now = today()
    const wrapper = mount(
      <Calendar
        max={new Date(now.getFullYear(), now.getMonth(), 1)}
        currentDate={new Date(now.getFullYear(), now.getMonth(), 1)}
      />,
    )

    const nextBtn = wrapper.find('.s-calendar__next-month')
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  // ── today highlight ──────────────────────────────────────────────

  test("today's date has today class", () => {
    const wrapper = mount(<Calendar />)

    const todayEl = wrapper.find('.s-calendar__day--today')
    expect(todayEl.exists()).toBe(true)
    expect(todayEl.text()).toContain(String(today().getDate()))
  })
})
