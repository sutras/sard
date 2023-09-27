import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { CustomWrapper, View } from '@tarojs/components'
import { useBem, useControllableValue, useEvent } from '../use'
import {
  formatDate,
  getDaysInMonth,
  getWeekOnFirstDay,
  toDateNumber,
  minmaxDate,
  getPrevMonthDate,
  getNextMonthDate,
  getOffsetDaysFromFirstDay,
  getPadStartDays,
  getPadEndDays,
  toMonthNumber,
} from '../utils'
import useTranslate from '../locale/useTranslate'

import { BaseProps } from '../base'
import Icon from '../icon'
import Button from '../button'
import Halfline from '../halfline'
import Popout, { PopoutProps } from '../popout'
import MonthPicker, { MonthPickerRef } from './MonthPicker'

export interface CalendarDay {
  date: Date
  type: 'same' | 'start' | 'middle' | 'end' | 'disabled' | 'selected' | 'normal'
  top: ReactNode
  text: ReactNode
  bottom: ReactNode
  className?: string
  style?: CSSProperties
}

export type CalendarType = 'single' | 'multiple' | 'range'

interface CalendarBaseProps extends Omit<BaseProps, 'children'> {
  min?: Date
  max?: Date
  defaultCurrentDate?: Date
  disabledDate?: (date: Date) => boolean
  maxDays?: number
  overMaxDays?: () => void
  weekStartsOn?: number
  formatter?: (day: CalendarDay) => void
  allowSameDay?: boolean
  withPopout?: boolean
  popoutProps?: PopoutProps
  outletFormatter?: (
    type: CalendarType,
    value: Date | Date[] | null | undefined,
  ) => string
  formatTemplate?: string
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

export interface CalendarFC extends FC<CalendarProps> {
  outletFormatter: typeof outletFormatter
  defaultOutletFormatter: typeof defaultOutletFormatter
}

const weeks = [0, 1, 2, 3, 4, 5, 6]

const getWeeks = (weekStartsOn: number) => {
  return weeks.slice(weekStartsOn).concat(weeks.slice(0, weekStartsOn))
}

const getMinDate = () => {
  return new Date(new Date().getFullYear() - 10, 0, 1)
}

const getMaxDate = () => {
  return new Date(new Date().getFullYear() + 10, 11, 31)
}

const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}

const defaultFormatTemplate = 'YYYY-MM-DD'

function defaultOutletFormatter(
  type: CalendarType,
  value: Date | Date[] | null | undefined,
  formatTemplate = defaultFormatTemplate,
) {
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

function outletFormatter(
  props: CalendarProps,
  value: Date | Date[] | null | undefined,
) {
  const formatter = props.outletFormatter ?? Calendar.defaultOutletFormatter
  return formatter(props.type || 'single', value, props.formatTemplate)
}

export const Calendar: CalendarFC = (props) => {
  const { t, lang } = useTranslate('calendar')

  const {
    className,
    style,

    type = 'single',
    value,
    defaultValue,
    onChange,

    min,
    max,
    defaultCurrentDate,
    disabledDate,
    maxDays = Number.MAX_SAFE_INTEGER,
    overMaxDays,
    weekStartsOn = 0,
    formatter,
    allowSameDay,
    withPopout,
    popoutProps,
    outletFormatter,
    formatTemplate,
    ...restProps
  } = props

  void outletFormatter
  void formatTemplate

  const [bem] = useBem('calendar')

  const minDate = useMemo(() => {
    return min || getMinDate()
  }, [min])

  const maxDate = useMemo(() => {
    const maxDate = max || getMaxDate()
    return maxDate.getTime() < minDate.getTime() ? new Date(minDate) : maxDate
  }, [max])

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => (type === 'single' ? null : []),
  })

  const [currentDate, setCurrentDate] = useState(() => {
    return minmaxDate(defaultCurrentDate || new Date(), minDate, maxDate)
  })

  useEffect(() => {
    const onlyOneDate = Array.isArray(innerValue)
      ? innerValue.length === 1
        ? innerValue[0]
        : null
      : innerValue
    if (
      onlyOneDate &&
      toMonthNumber(onlyOneDate) !== toMonthNumber(currentDate)
    ) {
      setCurrentDate(onlyOneDate)
    }
  }, [innerValue])

  const [startDate, setStartDate] = useState<Date | null>(() => {
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

    let val: Date | Date[] | null = null

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
  }

  // picker >>>
  const pickerRef = useRef<MonthPickerRef>(null)

  const handlePickerConfirm = useEvent((date: Date) => {
    if (toMonthNumber(currentDate) !== toMonthNumber(date)) {
      setCurrentDate(date)
    }
  })

  const renderMonthPicker = () => {
    return (
      <MonthPicker
        ref={pickerRef}
        minDate={minDate}
        maxDate={maxDate}
        defaultValue={currentDate}
        onConfirm={handlePickerConfirm}
      />
    )
  }
  // <<< picker

  // toolbar >>>
  const handleCurrentMonthClick = useEvent(() => {
    pickerRef.current?.setVisible(true)
    pickerRef.current?.setValue(currentDate)
  })

  const handlePrevMonthClick = useEvent(() => {
    setCurrentDate(getPrevMonthDate(currentDate))
  })

  const handleNextMonthClick = useEvent(() => {
    setCurrentDate(getNextMonthDate(currentDate))
  })

  const toolbarElement = useMemo(() => {
    return (
      <View className={bem.e('toolbar')}>
        <Button
          type="pale-text"
          theme="secondary"
          disabled={toMonthNumber(currentDate) <= toMonthNumber(minDate)}
          onClick={handlePrevMonthClick}
        >
          <Icon name="left" size={16} />
        </Button>
        <Button
          type="pale-text"
          theme="secondary"
          onClick={handleCurrentMonthClick}
        >
          {t('monthTitle', {
            year: currentDate.getFullYear(),
            month: String(currentDate.getMonth() + 1).padStart(2, '0'),
          })}
        </Button>
        <Button
          type="pale-text"
          theme="secondary"
          disabled={toMonthNumber(currentDate) >= toMonthNumber(maxDate)}
          onClick={handleNextMonthClick}
        >
          <Icon name="right" size={16} />
        </Button>
      </View>
    )
  }, [currentDate, minDate, maxDate, lang])
  // <<< toolbar

  const weekElement = useMemo(() => {
    return (
      <View className={bem.e('week')}>
        {getWeeks(weekStartsOn).map((item) => {
          return (
            <View key={item} className={bem.e('week-item')}>
              {t(`weeks.${item}`)}
            </View>
          )
        })}
      </View>
    )
  }, [weekStartsOn, lang])

  const renderMonth = (currentDates: Date[], year: number, month: number) => {
    const days = getDaysInMonth(year, month)
    const offsetDays = getOffsetDaysFromFirstDay(
      getWeekOnFirstDay(year, month),
      weekStartsOn,
    )
    const currentDays = Array(days)
      .fill(0)
      .map((_, i) => new Date(year, month, i + 1))
    const padStartDays = getPadStartDays(year, month, offsetDays)
    const padEndDays = getPadEndDays(year, month, 42 - offsetDays - days)

    const allDays = [...padStartDays, ...currentDays, ...padEndDays]

    let cachePrevSelected: boolean | undefined

    function withinMonth(i: number) {
      return i >= offsetDays && i < offsetDays + days
    }

    return (
      <View key={year * 100 + month} className={bem.e('month')}>
        {allDays.map((date, i) => {
          const dateNumber = toDateNumber(date)

          if (!withinMonth(i)) {
            return (
              <View
                key={dateNumber}
                className={classNames(bem.e('day'), bem.em('day', 'disabled'))}
              >
                {date.getDate()}
              </View>
            )
          }

          const selected = currentDates.some(
            (d) => toDateNumber(d) === dateNumber,
          )

          const prevSelected = cachePrevSelected
          cachePrevSelected = selected

          const nextDate = allDays[i + 1]
          const nextSelected =
            nextDate &&
            currentDates.some((d) => toDateNumber(d) === toDateNumber(nextDate))

          let disabled = false
          {
            if (disabledDate) {
              disabled = disabledDate(date)
            }

            if (
              dateNumber < toDateNumber(minDate) ||
              dateNumber > toDateNumber(maxDate)
            ) {
              disabled = true
            }
          }

          let isStart = false,
            isMiddle = false,
            isEnd = false

          if (type === 'range') {
            isStart =
              currentDates[0] && toDateNumber(currentDates[0]) === dateNumber

            isMiddle =
              currentDates.length === 2 &&
              dateNumber > toDateNumber(currentDates[0]) &&
              dateNumber < toDateNumber(currentDates[1])

            isEnd =
              currentDates[1] && toDateNumber(currentDates[1]) === dateNumber
          }

          const day: CalendarDay = {
            date,
            top: '',
            text: date.getDate(),
            bottom:
              isStart && isEnd
                ? `${t('start')}/${t('end')}`
                : isStart
                ? t('start')
                : isEnd
                ? t('end')
                : '',
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

          if (withinMonth(i) && formatter) {
            formatter(day)
          }

          return (
            <View
              key={dateNumber}
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
                bem.em('day', 'today', todayDays === dateNumber),
                day.className,
              )}
              style={day.style}
              onClick={() => handleDayClick(date, disabled)}
            >
              {day.text}

              {day.top && (
                <View
                  className={classNames(
                    bem.e('top'),
                    bem.em('top', 'selected', selected),
                  )}
                >
                  {day.top}
                </View>
              )}

              {day.bottom && (
                <View
                  className={classNames(
                    bem.e('bottom'),
                    bem.em('bottom', 'selected', selected),
                  )}
                >
                  {day.bottom}
                </View>
              )}
            </View>
          )
        })}
        <View className={bem.e('mark')}>{month + 1}</View>
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

  const renderCalendar = () => {
    return (
      <View
        {...restProps}
        className={classNames(bem.b(), className)}
        style={style}
        catchMove
      >
        <View className={bem.e('header')}>
          {toolbarElement}
          {weekElement}
          <Halfline direction="bottom" />
        </View>
        <View className={bem.e('body')}>
          {renderMonth(
            currentDates,
            currentDate.getFullYear(),
            currentDate.getMonth(),
          )}
        </View>
      </View>
    )
  }

  const renderElement = () => {
    return (
      <CustomWrapper>
        {renderCalendar()}
        {renderMonthPicker()}
      </CustomWrapper>
    )
  }

  if (withPopout) {
    return <Popout {...popoutProps}>{renderElement()}</Popout>
  }

  return renderElement()
}

Calendar.outletFormatter = outletFormatter
Calendar.defaultOutletFormatter = defaultOutletFormatter

export default Calendar
