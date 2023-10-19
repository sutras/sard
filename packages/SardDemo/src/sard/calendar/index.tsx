import { FC, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
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

import { BaseProps } from '../base'
import Halfline from '../halfline'
import Popout, { PopoutProps } from '../popout'
import MonthPicker, { MonthPickerRef } from './MonthPicker'
import Toolbar from './Toolbar'
import Weeks from './Weeks'
import Day, { CalendarDay } from './Day'
import CustomWrapper from '../custom-wrapper'

export type CalendarType = 'single' | 'multiple' | 'range'

export type { CalendarDay }

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

  const handleDayClick = useEvent((date: Date) => {
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
  })

  // picker >>>
  const pickerRef = useRef<MonthPickerRef>(null)

  const handlePickerConfirm = useEvent((date: Date) => {
    if (toMonthNumber(currentDate) !== toMonthNumber(date)) {
      setCurrentDate(date)
    }
  })
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
  // <<< toolbar

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

    function withinMonth(i: number) {
      return i >= offsetDays && i < offsetDays + days
    }

    return (
      <View key={year * 100 + month} className={bem.e('month')}>
        {allDays.map((date, i) => (
          <Day
            type={type}
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            currentDates={currentDates}
            formatter={formatter}
            disabledDate={disabledDate}
            within={withinMonth(i)}
            onClick={handleDayClick}
            key={i}
          />
        ))}
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

  const renderElement = () => {
    return (
      <CustomWrapper>
        <View
          {...restProps}
          className={classNames(bem.b(), className)}
          style={style}
          catchMove
        >
          <View className={bem.e('header')}>
            <Toolbar
              currentDate={currentDate}
              minDate={minDate}
              maxDate={maxDate}
              onPrevClick={handlePrevMonthClick}
              onNextClick={handleNextMonthClick}
              onMonthClick={handleCurrentMonthClick}
            />
            <Weeks weekStartsOn={weekStartsOn} />
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
        <MonthPicker
          ref={pickerRef}
          minDate={minDate}
          maxDate={maxDate}
          defaultValue={currentDate}
          onConfirm={handlePickerConfirm}
        />
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
