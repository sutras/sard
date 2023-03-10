import {
  CSSProperties,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { getDaysInMonth, getWeekOnFirstDay, getDaysInDate } from '../../utils'

interface CalendarBaseProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  min?: Date
  max?: Date
  title?: ReactNode
  disabledDate?: (date: Date) => boolean
}

export interface CalendarSingleProps extends CalendarBaseProps {
  type?: 'single'
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  type?: 'multiple'
  maxDays?: number
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  type?: 'range'
  maxDays?: number
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

const weeks = ['日', '一', '二', '三', '四', '五', '六']

const getMinDate = () => {
  return new Date()
}

const getMaxDate = () => {
  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  return date
}

export interface CalendarImperative {
  scrollToDate(date: Date): void
}

export const Calendar = forwardRef<CalendarImperative, CalendarProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      min,
      max,
      title,
      disabledDate,
      type = 'single',
      value,
      defaultValue,
      onChange,
      ...restProps
    } = props

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

    const toLegalValue = (value: null | undefined | Date | Date[]) => {
      return value ? (Array.isArray(value) ? value : [value]) : []
    }

    const [innerValue, setInnerValue] = useState<Date[]>(() => {
      return toLegalValue(value ?? defaultValue)
    })

    // 受控
    useEffect(() => {
      if (value !== undefined) {
        setInnerValue(toLegalValue(value))
      }
    }, [value])

    const handleDayClick = (date: Date, disabled: boolean) => {
      if (disabled) {
        return
      }

      if (type === 'single') {
        onChange
        // 非受控
        if (value === undefined) {
          setInnerValue([date])
        }
        onChange?.(date as any)
      } else if (type === 'multiple') {
        const val = innerValue.some(
          (d) => getDaysInDate(d) === getDaysInDate(date),
        )
          ? innerValue.filter((d) => getDaysInDate(d) !== getDaysInDate(date))
          : innerValue.concat(date)

        // 非受控
        if (value === undefined) {
          setInnerValue(val)
        }
        onChange?.(val as any)
      } else if (type === 'range') {
        const val =
          innerValue.length === 1
            ? innerValue.concat(date).sort((a, b) => a.getTime() - b.getTime())
            : [date]

        // 非受控
        if (value === undefined) {
          setInnerValue(val)
        }
        onChange?.(val as any)
        // if (val.length === 2) {
        // }
      }
    }

    const scrollToDate = useEvent((date: Date) => {
      const el = dateElements.current[getDaysInDate(date)] as Element

      if (el) {
        setTimeout(() => {
          el.scrollIntoView(true)
        })
      }
    })

    useImperativeHandle(ref, () => ({
      scrollToDate,
    }))

    const renderMonth = ([year, month]: [number, number]) => {
      const days = getDaysInMonth(year, month)
      let nextDate: Date | undefined
      let nextSelected: boolean | undefined

      return (
        <div key={year * 100 + month} className="s-calendar-month">
          <div className="s-calendar-month-title">
            {year}年{month}月
          </div>
          <div className="s-calendar-month-body">
            {Array(days)
              .fill(0)
              .map((_, i) => {
                const date = nextDate ?? new Date(year, month - 1, i + 1)
                const dateDays = getDaysInDate(date)
                const selected =
                  nextSelected ??
                  innerValue.some((d) => getDaysInDate(d) === dateDays)
                if (i < days - 1) {
                  nextDate = new Date(year, month - 1, i + 2)
                  nextSelected = innerValue.some(
                    (d) => getDaysInDate(d) === getDaysInDate(nextDate),
                  )
                } else {
                  nextDate = nextSelected = undefined
                }

                let disabled = false

                if (disabledDate) {
                  disabled = disabledDate(date)
                }

                if (
                  dateDays < getDaysInDate(minDate) ||
                  dateDays > getDaysInDate(maxDate)
                ) {
                  disabled = true
                }

                return (
                  <div
                    key={i}
                    ref={(el) => (dateElements.current[dateDays] = el)}
                    className={classNames('s-calendar-day', {
                      's-calendar-day-selected': selected,
                      's-calendar-day-next-selected': selected && nextSelected,
                      's-calendar-day-start':
                        type === 'range' &&
                        innerValue[0] &&
                        getDaysInDate(innerValue[0]) === dateDays,
                      's-calendar-day-end':
                        type === 'range' &&
                        innerValue[1] &&
                        getDaysInDate(innerValue[1]) === dateDays,
                      's-calendar-day-middle':
                        type === 'range' &&
                        innerValue.length === 2 &&
                        dateDays > getDaysInDate(innerValue[0]) &&
                        dateDays < getDaysInDate(innerValue[1]),
                      's-calendar-day-disabled': disabled,
                    })}
                    style={{
                      gridColumnStart:
                        i === 0 ? getWeekOnFirstDay(year, month) + 1 : '',
                    }}
                    onClick={() => handleDayClick(date, disabled)}
                  >
                    {i + 1}
                  </div>
                )
              })}
            <div className="s-calendar-month-mark">{month}</div>
          </div>
        </div>
      )
    }

    return (
      <div {...restProps} className={classNames('s-calendar', className)}>
        <div className="s-calendar-header">
          {title && <div className="s-calendar-title">{title}</div>}
          <div className="s-calendar-week">
            {weeks.map((item) => (
              <div key={item} className="s-calendar-week-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="s-calendar-body">
          {Array(maxMonthCount - minMonthCount + 1)
            .fill(0)
            .map((_, i) => renderMonth(getYearMonthByIndex(i)))}
        </div>
        <div className="s-calendar-footer"></div>
      </div>
    )
  },
)

export default Calendar
