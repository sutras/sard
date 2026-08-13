import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Compact from './compact.vue'

export const Compact: EnhancedComponent<typeof _Compact> = enhanceComponent(_Compact)
export default Compact

export type { CompactProps, CompactSlots, CompactEmits, CompactExpose } from './common'
