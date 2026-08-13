import { type DefaultProps } from '../config'
import { type DatetimePickerSlots, type DatetimePickerProps } from '../datetime-picker/common'

export interface DatetimeRangePickerProps extends Omit<DatetimePickerProps, 'modelValue'> {
  modelValue?: (Date | string)[]
  tabs?: string[]
}

export const defaultDatetimeRangePickerProps: DefaultProps<DatetimeRangePickerProps> = {
  type: 'yMd',
}

export interface DatetimeRangePickerSlots extends DatetimePickerSlots {
  header?(props: Record<string, never>): any
  footer?(props: Record<string, never>): any
}

export interface DatetimeRangePickerEmits {
  (e: 'update:modelValue', date: (Date | string)[]): void
  (e: 'change', date: (Date | string)[]): void
}
