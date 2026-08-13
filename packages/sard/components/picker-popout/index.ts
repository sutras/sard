import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PickerPopout from './picker-popout.vue'

export const PickerPopout: EnhancedComponent<typeof _PickerPopout> = enhanceComponent(_PickerPopout)
export default PickerPopout

export type {
  PickerPopoutProps,
  PickerPopoutSlots,
  PickerPopoutEmits,
  PickerPopoutExpose,
} from './common'
