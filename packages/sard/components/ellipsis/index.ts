import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Ellipsis from './ellipsis.vue'

export const Ellipsis: EnhancedComponent<typeof _Ellipsis> = enhanceComponent(_Ellipsis)
export default Ellipsis

export type {
  EllipsisProps,
  EllipsisSlots,
  EllipsisEmits,
  EllipsisExpose,
  EllipsisPosition,
} from './common'
