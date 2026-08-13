import { type DefaultProps } from '../config'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
} from '../datetime-range-picker-popout/common'
import { type PopoutInputSlots, type PopoutInputProps } from '../popout-input/common'

export interface DatetimeRangePickerInputProps
  extends DatetimeRangePickerPopoutProps, Omit<PopoutInputProps, 'modelValue'> {
  outletFormat?: string
}

export const defaultDatetimeRangePickerInputProps: DefaultProps<DatetimeRangePickerInputProps> = {
  type: 'yMd',
  validateEvent: true,
}

export interface DatetimeRangePickerInputSlots
  extends DatetimeRangePickerPopoutSlots, PopoutInputSlots {}

export interface DatetimeRangePickerInputEmits extends DatetimeRangePickerPopoutEmits {}
