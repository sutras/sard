import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
} from '../datetime-range-picker/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface DatetimeRangePickerPopoutProps extends FormPopoutProps, DatetimeRangePickerProps {}

export const defaultDatetimeRangePickerPopoutProps: DefaultProps<DatetimeRangePickerPopoutProps> = {
  type: 'yMd',
  validateEvent: true,
}

export interface DatetimeRangePickerPopoutSlots extends DatetimeRangePickerSlots {}

export interface DatetimeRangePickerPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', date: (Date | string)[] | undefined): void
  (e: 'change', date: (Date | string)[] | undefined): void
  (e: 'confirm'): void
}

export interface DatetimeRangePickerPopoutExpose {}
