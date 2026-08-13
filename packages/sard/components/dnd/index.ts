import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Dnd from './dnd.vue'
import _DndItem from './dnd-item.vue'
import _DndHandle from './dnd-handle.vue'

export const Dnd: EnhancedComponent<typeof _Dnd> = enhanceComponent(_Dnd)
export const DndItem: EnhancedComponent<typeof _DndItem> = enhanceComponent(_DndItem)
export const DndHandle: EnhancedComponent<typeof _DndHandle> = enhanceComponent(_DndHandle)
export default Dnd

export type {
  DndProps,
  DndSlots,
  DndEmits,
  DndExpose,
  DndItemProps,
  DndItemSlots,
  DndItemEmits,
  DndItemExpose,
  DndHandleProps,
  DndHandleSlots,
  DndHandleEmits,
  DndHandleExpose,
} from './common'
