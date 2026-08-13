import { type CalendarPopoutEmits, type CalendarPopoutProps } from '../calendar-popout/common'
import { type PopoutInputSlots, type PopoutInputProps } from '../popout-input/common'
import { type DefaultProps } from '../config'

export interface CalendarInputProps
  extends CalendarPopoutProps, Omit<PopoutInputProps, 'modelValue'> {
  outletFormat?: string
}

export const defaultCalendarInputProps: DefaultProps<CalendarInputProps> = {
  type: 'single',
  maxDays: Number.MAX_SAFE_INTEGER,
  weekStartsOn: 0,
  showConfirm: true,
  validateEvent: true,
  outletFormat: 'YYYY-MM-DD',
}

export interface CalendarInputSlots extends PopoutInputSlots {}

export interface CalendarInputEmits extends CalendarPopoutEmits {}
