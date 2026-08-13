import { type DefaultProps } from '../config'
import { type ColorFormat, defaultColorPickerPresets } from '../../utils/color'

export interface ColorPickerProps {
  modelValue?: string
  showAlpha?: boolean
  format?: ColorFormat
  showFormat?: boolean
  presets?: string[]
  showPresets?: boolean
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultColorPickerProps: DefaultProps<ColorPickerProps> = {
  showAlpha: false,
  format: 'rgb',
  showFormat: false,
  presets: () => defaultColorPickerPresets.slice(),
  showPresets: false,
  validateEvent: true,
}

export interface ColorPickerSlots {}

export interface ColorPickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'update:format', format: ColorFormat): void
  (e: 'format-change', format: ColorFormat): void
}

export interface ColorPickerExpose {}
