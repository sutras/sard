import { type PopoutInputSlots, type PopoutInputProps } from '../popout-input/common'
import { type DefaultProps } from '../config'
import {
  type DatetimePickerPopoutProps,
  type DatetimePickerPopoutEmits,
  type DatetimePickerPopoutSlots,
} from '../datetime-picker-popout/common'

export interface DatetimePickerInputProps
  extends DatetimePickerPopoutProps, Omit<PopoutInputProps, 'modelValue'> {
  outletFormat?: string
}

export const defaultDatetimePickerInputProps: DefaultProps<DatetimePickerInputProps> = {
  type: 'yMd',
  calendar: 'solar',
  validateEvent: true,
}

export interface DatetimePickerInputSlots extends DatetimePickerPopoutSlots, PopoutInputSlots {}

export interface DatetimePickerInputEmits extends DatetimePickerPopoutEmits {}

export const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdh: 'YYYY-MM-DD HH',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
