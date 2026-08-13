import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ColorPicker from './color-picker.vue'

export const ColorPicker: EnhancedComponent<typeof _ColorPicker> = enhanceComponent(_ColorPicker)
export default ColorPicker

export type {
  ColorPickerProps,
  ColorPickerSlots,
  ColorPickerEmits,
  ColorPickerExpose,
} from './common'

export type { ColorFormat } from '../../utils/color'
