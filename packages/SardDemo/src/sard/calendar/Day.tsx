import { CSSProperties, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem } from '../use'
import { toDateNumber } from '../utils'
import useTranslate from '../locale/useTranslate'

export interface CalendarDay {
  date: Date
  type: 'same' | 'start' | 'middle' | 'end' | 'disabled' | 'selected' | 'normal'
  top: ReactNode
  text: ReactNode
  bottom: ReactNode
  className?: string
  style?: CSSProperties
}

export interface DayProps {
  type: 'single' | 'multiple' | 'range'
  date: Date
  minDate: Date
  maxDate: Date
  currentDates: Date[]
  formatter?: (day: CalendarDay) => void
  disabledDate?: (date: Date) => boolean
  within: boolean
  onClick: (date: Date) => void
}

const todayDays = toDateNumber(new Date())

export const Day = (props: DayProps) => {
  const { t } = useTranslate('calendar')

  const {
    type,
    date,
    minDate,
    maxDate,
    currentDates,
    formatter,
    disabledDate,
    within,
    onClick,
  } = props

  const [bem] = useBem('calendar')
  const dateNumber = toDateNumber(date)

  if (!within) {
    return (
      <View
        key={dateNumber}
        className={classNames(bem.e('day'), bem.em('day', 'disabled'))}
      >
        {date.getDate()}
      </View>
    )
  }

  const selected = currentDates.some((d) => toDateNumber(d) === dateNumber)

  const prevDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1,
  )
  const prevSelected = currentDates.some(
    (d) => toDateNumber(d) === toDateNumber(prevDate),
  )

  const nextDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
  )
  const nextSelected = currentDates.some(
    (d) => toDateNumber(d) === toDateNumber(nextDate),
  )

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
    isStart = currentDates[0] && toDateNumber(currentDates[0]) === dateNumber

    isMiddle =
      currentDates.length === 2 &&
      dateNumber > toDateNumber(currentDates[0]) &&
      dateNumber < toDateNumber(currentDates[1])

    isEnd = currentDates[1] && toDateNumber(currentDates[1]) === dateNumber
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

  if (formatter) {
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
      onClick={() => onClick(date)}
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
}

export default Day
