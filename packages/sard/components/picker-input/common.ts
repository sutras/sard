import { type PopoutInputSlots, type PopoutInputProps } from '../popout-input/common'
import {
  defaultPickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  type PickerPopoutProps,
} from '../picker-popout/common'

export interface PickerInputProps<T>
  extends PickerPopoutProps<T>, Omit<PopoutInputProps, 'modelValue'> {}

export const defaultPickerInputProps = {
  ...defaultPickerPopoutProps,
}

export interface PickerInputSlots<T> extends PickerPopoutSlots<T>, PopoutInputSlots {}

export interface PickerInputEmits extends PickerPopoutEmits {}
