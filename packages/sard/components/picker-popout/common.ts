import { defaultPickerProps, type PickerSlots, type PickerProps } from '../picker/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface PickerPopoutProps<T> extends FormPopoutProps, PickerProps<T> {}

export const defaultPickerPopoutProps: DefaultProps<PickerPopoutProps<any>> = {
  ...defaultPickerProps,
  validateEvent: true,
}

export interface PickerPopoutSlots<T> extends PickerSlots<T> {}

export interface PickerPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm'): void
}

export interface PickerPopoutExpose {}
