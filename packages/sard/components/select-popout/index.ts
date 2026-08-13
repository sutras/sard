import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _SelectPopout from './select-popout.vue'

export const SelectPopout: EnhancedComponent<typeof _SelectPopout> = enhanceComponent(_SelectPopout)
export default SelectPopout

export type {
  SelectPopoutProps,
  SelectPopoutSlots,
  SelectPopoutEmits,
  SelectPopoutExpose,
} from './common'
