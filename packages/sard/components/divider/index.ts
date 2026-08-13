import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Divider from './divider.vue'

export const Divider: EnhancedComponent<typeof _Divider> = enhanceComponent(_Divider)
export default Divider

export type { DividerProps, DividerSlots, DividerEmits, DividerExpose } from './common'
