import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Collapse from './collapse.vue'

export const Collapse: EnhancedComponent<typeof _Collapse> = enhanceComponent(_Collapse)
export default Collapse

export type { CollapseProps, CollapseSlots } from './common'
