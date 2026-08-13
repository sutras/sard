import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Indexes from './indexes.vue'
import _IndexesAnchor from './indexes-anchor.vue'
import _IndexesNav from './indexes-nav.vue'

export const Indexes: EnhancedComponent<typeof _Indexes> = enhanceComponent(_Indexes)
export const IndexesAnchor: EnhancedComponent<typeof _IndexesAnchor> =
  enhanceComponent(_IndexesAnchor)
export const IndexesNav: EnhancedComponent<typeof _IndexesNav> = enhanceComponent(_IndexesNav)
export default Indexes

export type {
  IndexesProps,
  IndexesSlots,
  IndexesEmits,
  IndexesExpose,
  IndexesAnchorProps,
  IndexesAnchorSlots,
  IndexesNavProps,
  IndexesNavSlots,
  IndexesNavEmits,
} from './common'
