import { type DefaultProps } from '../config'
import { type CalendarDay, type CalendarType } from '../calendar'

export interface DateStripProps {
  type?: CalendarType
  modelValue?: Date | Date[] | string | string[]
  min?: Date
  max?: Date
  currentDate?: Date
  disabledDate?: (date: Date) => boolean
  maxDays?: number
  overMaxDays?: () => void
  formatter?: (day: CalendarDay) => void
  filter?: (date: Date) => boolean
  allowSameDay?: boolean
  valueFormat?: string
  startDateText?: string
  endDateText?: string
  sameDateText?: string
  showLunar?: boolean
}

export const defaultDateStripProps: DefaultProps<DateStripProps> = {
  type: 'single',
  maxDays: Number.MAX_SAFE_INTEGER,
  showLunar: false,
}

export interface DateStripEmits {
  (e: 'update:modelValue', value: Date | Date[] | string | string[]): void
  (e: 'change', value: Date | Date[] | string | string[]): void
}

export const getMinDate = (date = new Date()) => {
  const start = new Date(date)
  start.setDate(start.getDate() - 7)
  return start
}

export const getMaxDate = (date = new Date()) => {
  const end = new Date(date)
  end.setDate(end.getDate() + 7)
  return end
}

export const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}
