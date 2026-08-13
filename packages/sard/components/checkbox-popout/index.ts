import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CheckboxPopout from './checkbox-popout.vue'

export const CheckboxPopout: EnhancedComponent<typeof _CheckboxPopout> =
  enhanceComponent(_CheckboxPopout)
export default CheckboxPopout

export type {
  CheckboxPopoutProps,
  CheckboxPopoutSlots,
  CheckboxPopoutEmits,
  CheckboxPopoutExpose,
} from './common'
