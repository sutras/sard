import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ColorPickerInput from './color-picker-input.vue'

export const ColorPickerInput: EnhancedComponent<typeof _ColorPickerInput> =
  enhanceComponent(_ColorPickerInput)
export default ColorPickerInput

export type {
  ColorPickerInputProps,
  ColorPickerInputSlots,
  ColorPickerInputEmits,
  ColorPickerInputExpose,
} from './common'
