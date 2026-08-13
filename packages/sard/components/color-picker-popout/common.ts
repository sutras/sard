import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import { defaultColorPickerProps, type ColorPickerProps } from '../color-picker/common'
import type { MotionEmits } from '../motion'

export interface ColorPickerPopoutProps extends FormPopoutProps, ColorPickerProps {}

export const defaultColorPickerPopoutProps: DefaultProps<ColorPickerPopoutProps> = {
  ...defaultColorPickerProps,
  showConfirm: true,
  validateEvent: true,
}

export interface ColorPickerPopoutSlots {
  title?(props: Record<string, never>): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface ColorPickerPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'confirm'): void
}

export interface ColorPickerPopoutExpose {}
