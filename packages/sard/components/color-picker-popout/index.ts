import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ColorPickerPopout from './color-picker-popout.vue'

export const ColorPickerPopout: EnhancedComponent<typeof _ColorPickerPopout> =
  enhanceComponent(_ColorPickerPopout)
export default ColorPickerPopout

export type {
  ColorPickerPopoutProps,
  ColorPickerPopoutSlots,
  ColorPickerPopoutEmits,
  ColorPickerPopoutExpose,
} from './common'
