import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _RadioPopout from './radio-popout.vue'

export const RadioPopout: EnhancedComponent<typeof _RadioPopout> = enhanceComponent(_RadioPopout)
export default RadioPopout

export type {
  RadioPopoutProps,
  RadioPopoutSlots,
  RadioPopoutEmits,
  RadioPopoutExpose,
} from './common'
