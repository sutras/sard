import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Fab from './fab.vue'
import _FabItem from './fab-item.vue'

export const Fab: EnhancedComponent<typeof _Fab> = enhanceComponent(_Fab)
export const FabItem: EnhancedComponent<typeof _FabItem> = enhanceComponent(_FabItem)
export default Fab

export type {
  FabProps,
  FabSlots,
  FabEmits,
  FabItemProps,
  FabItemSlots,
  FabItemEmits,
  FabItemExpose,
} from './common'
