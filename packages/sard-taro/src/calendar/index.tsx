import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useBem, useControllableValue, useEvent } from '../use'
import {
  formatDate,
  getDaysInMonth,
  getWeekOnFirstDay,
  toDateNumber,
} from '../utils'
import { scrollIntoView, ScrollIntoViewPosition } from '../utils'
import useTranslate from '../locale/useTranslate'

import { BaseProps } from '../base'
import { CustomWrapper, ScrollView, View } from '@tarojs/components'

export interface CalendarDay {
  date: Date
  topInfo: ReactNode
  text: ReactNode
  bottomInfo: ReactNode
  type: 'same' | 'start' | 'middle' | 'end' | 'disabled' | 'selected' | 'normal'
  className?: string
  style?: CSSProperties
}

export type CalendarType = 'single' | 'multiple' | 'range'

interface CalendarBaseProps extends Omit<BaseProps, 'children'> {
  min?: Date
  max?: Date
  title?: ReactNode
  disabledDate?: (date: Date) => boolean
  maxDays?: number
  overMaxDays?: () => void
  weekStartsOn?: number
  formatter?: (day: CalendarDay) => void
  allowSameDay?: boolean
  onOutletChange?: (outletValue: any, isManual: boolean) => void
  outletFormatter?: (type: CalendarType, value: Date | Date[]) => string
}

export interface CalendarSingleProps extends CalendarBaseProps {
  type?: 'single'
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  type?: 'multiple'
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  type?: 'range'
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

const weeks = [0, 1, 2, 3, 4, 5, 6]

const getWeeks = (weekStartsOn: number) => {
  return weeks.slice(weekStartsOn).concat(weeks.slice(0, weekStartsOn))
}

const getOffsetWeek = (week: number, weekStartsOn: number) => {
  return (week - weekStartsOn + 7) % 7
}

const getMinDate = () => {
  return new Date()
}

const getMaxDate = () => {
  const date = new Date()
  date.setMonth(date.getMonth() + 2)
  return date
}

const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}

export interface CalendarRef {
  scrollToDate: (
    date: Date,
    align: 'start' | 'center' | 'end' | 'nearest',
  ) => void
}

const formatTemplate = 'YYYY-MM-DD'

function defaultOutletFormatter(type: CalendarType, value: Date | Date[]) {
  switch (type) {
    case 'single':
      if (value instanceof Date) {
        return formatDate(value, formatTemplate)
      }
      break
    case 'range':
      if (Array.isArray(value)) {
        return value.map((date) => formatDate(date, formatTemplate)).join(' - ')
      }
      break
    case 'multiple':
      if (Array.isArray(value)) {
        return value.map((date) => formatDate(date, formatTemplate)).join(', ')
      }
  }
  return ''
}

export interface CalendarFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<CalendarProps> & RefAttributes<CalendarRef>
  > {
  hasOutletChange: boolean
}

export const Calendar = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
  const [t] = useTranslate('calendar')

  const {
    className,
    min,
    max,
    title,
    disabledDate,
    type = 'single',
    value,
    defaultValue,
    onChange,
    onOutletChange,
    outletFormatter = defaultOutletFormatter,
    maxDays = Number.MAX_SAFE_INTEGER,
    overMaxDays,
    weekStartsOn = 0,
    formatter,
    allowSameDay,
    ...restProps
  } = props

  const [bem] = useBem('calendar')

  const dateElements = useRef<Record<string, HTMLElement>>({})

  const minDate = useMemo(() => {
    return min || getMinDate()
  }, [min])

  const maxDate = useMemo(() => {
    const maxDate = max || getMaxDate()
    return maxDate.getTime() < minDate.getTime() ? new Date(minDate) : maxDate
  }, [max])

  const minMonthCount = useMemo(() => {
    return minDate.getFullYear() * 12 + minDate.getMonth() + 1
  }, [min])

  const maxMonthCount = useMemo(() => {
    return maxDate.getFullYear() * 12 + maxDate.getMonth() + 1
  }, [max])

  const getYearMonthByIndex = (index: number): [number, number] => {
    const monthCount = minMonthCount + index
    return [Math.ceil(monthCount / 12 - 1), monthCount % 12 || 12]
  }

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => (type === 'single' ? null : []),
  })

  const isManual = useRef(false)

  useEffect(() => {
    if (onOutletChange) {
      onOutletChange(outletFormatter(type, innerValue), isManual.current)
      isManual.current = false
    }
  }, [innerValue])

  const [startDate, setStartDate] = useState<Date>(() => {
    return type === 'range' &&
      Array.isArray(innerValue) &&
      innerValue.length === 1
      ? innerValue[0]
      : null
  })

  const todayDays = useMemo(() => toDateNumber(new Date()), [])

  const handleDayClick = (date: Date, disabled: boolean) => {
    if (disabled) {
      return
    }

    let val: Date | Date[]

    if (type === 'single') {
      val = date
    } else if (type === 'multiple') {
      if (Array.isArray(innerValue)) {
        if (innerValue.some((d) => toDateNumber(d) === toDateNumber(date))) {
          val = innerValue.filter((d) => toDateNumber(d) !== toDateNumber(date))
        } else {
          if (innerValue.length >= maxDays) {
            overMaxDays?.()
            return
          }
          val = sortDates(innerValue.concat(date))
        }
      }
    } else if (type === 'range') {
      if (startDate) {
        const startDays = toDateNumber(startDate)
        const endDays = toDateNumber(date)

        if (!allowSameDay && startDays === endDays) {
          return
        }

        const startAgain = endDays < startDays
        if (startAgain) {
          setStartDate(date)
          return
        }

        let endDate = date

        if (endDays - startDays + 1 > maxDays) {
          overMaxDays?.()

          endDate = new Date(startDate)
          endDate.setDate(endDate.getDate() + (maxDays - 1))
        }

        val = [startDate, endDate]
      } else {
        val = []
      }

      setStartDate(startDate ? null : date)
    }

    setInnerValue(val)

    isManual.current = true
  }

  const scrollToDate = useEvent(
    (date: Date, align: ScrollIntoViewPosition = 'nearest') => {
      const el = dateElements.current[toDateNumber(date)] as HTMLElement

      if (el) {
        scrollIntoView(el, {
          block: align,
        })
      }
    },
  )

  // 滚动定位到选中日期的节点
  // const [ResizeSpy] = useResizeObserver(() => {
  //   const date = type === 'single' ? innerValue : innerValue[0] || startDate
  //   if (date) {
  //     scrollToDate(date)
  //   }
  // })

  useImperativeHandle(ref, () => ({
    scrollToDate,
  }))

  const renderMonth = (
    currentDates: Date[],
    [year, month]: [number, number],
  ) => {
    const days = getDaysInMonth(year, month)
    let nextDate: Date | undefined
    let previousSelected: boolean | undefined
    let nextSelected: boolean | undefined

    return (
      <View key={year * 100 + month} className={bem.e('month')}>
        <View className={bem.e('month-title')}>
          {t('monthTitle', { year, month })}
        </View>
        <View className={bem.e('month-body')}>
          {Array(days)
            .fill(0)
            .map((_, i) => {
              const date = nextDate ?? new Date(year, month - 1, i + 1)
              const dateDays = toDateNumber(date)
              const selected =
                nextSelected ??
                currentDates.some((d) => toDateNumber(d) === dateDays)
              const prevSelected = previousSelected
              previousSelected = selected

              if (i < days - 1) {
                nextDate = new Date(year, month - 1, i + 2)
                nextSelected = currentDates.some(
                  (d) => toDateNumber(d) === toDateNumber(nextDate),
                )
              } else {
                nextDate = nextSelected = undefined
              }

              let disabled = false

              if (disabledDate) {
                disabled = disabledDate(date)
              }

              if (
                dateDays < toDateNumber(minDate) ||
                dateDays > toDateNumber(maxDate)
              ) {
                disabled = true
              }

              const isStart =
                type === 'range' &&
                currentDates[0] &&
                toDateNumber(currentDates[0]) === dateDays

              const isMiddle =
                type === 'range' &&
                currentDates.length === 2 &&
                dateDays > toDateNumber(currentDates[0]) &&
                dateDays < toDateNumber(currentDates[1])

              const isEnd =
                type === 'range' &&
                currentDates[1] &&
                toDateNumber(currentDates[1]) === dateDays

              const day: CalendarDay = {
                date,
                topInfo: '',
                text: i + 1,
                bottomInfo: isStart ? t('start') : isEnd ? t('end') : '',
                type:
                  isStart && isEnd
                    ? 'same'
                    : isStart
                    ? 'start'
                    : isMiddle
                    ? 'middle'
                    : isEnd
                    ? 'end'
                    : disabled
                    ? 'disabled'
                    : selected
                    ? 'selected'
                    : 'normal',
              }

              formatter?.(day)

              return (
                <View
                  key={year * 10000 + month * 100 + i}
                  ref={(el) => (dateElements.current[dateDays] = el)}
                  className={classNames(
                    bem.e('day'),
                    bem.em('day', 'selected', selected),
                    bem.em('day', 'prev-selected', prevSelected),
                    bem.em('day', 'next-selected', selected && nextSelected),
                    bem.em('day', 'start', isStart),
                    bem.em('day', 'only-start', isStart && !isEnd),
                    bem.em('day', 'end', isEnd),
                    bem.em('day', 'only-end', isEnd && !isStart),
                    bem.em('day', 'middle', isMiddle),
                    bem.em('day', 'disabled', disabled),
                    bem.em('day', 'today', todayDays === dateDays),
                    day.className,
                  )}
                  style={{
                    marginLeft:
                      i === 0
                        ? getOffsetWeek(
                            getWeekOnFirstDay(year, month),
                            weekStartsOn,
                          ) *
                            (100 / 7) +
                          '%'
                        : '',
                    ...day.style,
                  }}
                  onClick={() => handleDayClick(date, disabled)}
                >
                  {day.topInfo && (
                    <View className={bem.e('topinfo')}>{day.topInfo}</View>
                  )}
                  {day.text}
                  {day.bottomInfo && (
                    <View className={bem.e('bottominfo')}>
                      {day.bottomInfo}
                    </View>
                  )}
                </View>
              )
            })}
          <View className={bem.e('mark')}>{month}</View>
        </View>
      </View>
    )
  }

  const currentDates = useMemo(() => {
    let dates: Date[]

    if (type === 'range' && startDate) {
      dates = [startDate]
    } else {
      if (Array.isArray(innerValue)) {
        dates = innerValue
      } else if (innerValue) {
        dates = [innerValue]
      } else {
        dates = []
      }
    }

    return dates
  }, [innerValue, startDate, type])

  return (
    <CustomWrapper>
      <View {...restProps} className={classNames(bem.b(), className)}>
        {/* <ResizeSpy /> */}
        <View className={bem.e('header')}>
          {title && <View className={bem.e('title')}>{title}</View>}
          <View className={bem.e('week')}>
            {getWeeks(weekStartsOn).map((item) => (
              <View key={item} className={bem.e('week-item')}>
                {t(`weeks.${item}`)}
              </View>
            ))}
          </View>
        </View>
        <ScrollView
          enableFlex
          className={bem.e('body')}
          scrollY
          onScrollToUpper={(event) => event.preventDefault()}
          onScrollToLower={(event) => event.preventDefault()}
        >
          {Array(maxMonthCount - minMonthCount + 1)
            .fill(0)
            .map((_, i) => renderMonth(currentDates, getYearMonthByIndex(i)))}
        </ScrollView>
        <View className={bem.e('footer')}></View>
      </View>
    </CustomWrapper>
  )
}) as CalendarFC

Calendar.hasOutletChange = true

export default Calendar
