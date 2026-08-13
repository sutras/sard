import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Segmented from './segmented.vue'
import _SegmentedItem from './segmented-item.vue'

export const Segmented: EnhancedComponent<typeof _Segmented> = enhanceComponent(_Segmented)
export const SegmentedItem: EnhancedComponent<typeof _SegmentedItem> =
  enhanceComponent(_SegmentedItem)
export default Segmented

export type {
  SegmentedProps,
  SegmentedSlots,
  SegmentedEmits,
  SegmentedExpose,
  SegmentedSize,
  SegmentedItemProps,
  SegmentedItemSlots,
  SegmentedItemEmits,
  SegmentedItemExpose,
} from './common'
