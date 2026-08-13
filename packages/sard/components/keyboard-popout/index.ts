import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _KeyboardPopout from './keyboard-popout.vue'

export const KeyboardPopout: EnhancedComponent<typeof _KeyboardPopout> =
  enhanceComponent(_KeyboardPopout)
export default KeyboardPopout

export type {
  KeyboardPopoutProps,
  KeyboardPopoutSlots,
  KeyboardPopoutEmits,
  KeyboardPopoutExpose,
} from './common'
