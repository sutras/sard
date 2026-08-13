import { type CalendarProps } from '../calendar/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface CalendarPopoutProps extends FormPopoutProps, CalendarProps {}

export const defaultCalendarPopoutProps: DefaultProps<CalendarPopoutProps> = {
  type: 'single',
  maxDays: Number.MAX_SAFE_INTEGER,
  weekStartsOn: 0,
  showConfirm: true,
  validateEvent: true,
}

export interface CalendarPopoutSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface CalendarPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: Date | Date[] | string | string[] | undefined): void
  (e: 'change', value: Date | Date[] | string | string[] | undefined): void
  (e: 'confirm'): void
}

export interface CalendarPopoutExpose {}
