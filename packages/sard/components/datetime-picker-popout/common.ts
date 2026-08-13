import { type DatetimePickerProps, type DatetimePickerSlots } from '../datetime-picker/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface DatetimePickerPopoutProps extends FormPopoutProps, DatetimePickerProps {}

export const defaultDatetimePickerPopoutProps: DefaultProps<DatetimePickerPopoutProps> = {
  type: 'yMd',
  calendar: 'solar',
  validateEvent: true,
}

export interface DatetimePickerPopoutSlots extends DatetimePickerSlots {}

export interface DatetimePickerPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', date: Date | string | undefined): void
  (e: 'change', date: Date | string | undefined): void
  (e: 'confirm'): void
}

export interface DatetimePickerPopoutExpose {}
