import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Keyboard from './keyboard.vue'

export const Keyboard: EnhancedComponent<typeof _Keyboard> = enhanceComponent(_Keyboard)
export default Keyboard

export {
  type KeyboardProps,
  type KeyboardSlots,
  type KeyboardEmits,
  type KeyBoardExpose,
  type KeyboardPlateMode,
  plateProvinceKeys,
  plateSuffixKeys,
  plateEnglishLetterKeys,
} from './common'
