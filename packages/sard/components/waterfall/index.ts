import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Waterfall from './waterfall.vue'
import _WaterfallItem from './waterfall-item.vue'
import _WaterfallLoad from './waterfall-load.vue'

export const Waterfall: EnhancedComponent<typeof _Waterfall> = enhanceComponent(_Waterfall)
export const WaterfallItem: EnhancedComponent<typeof _WaterfallItem> =
  enhanceComponent(_WaterfallItem)
export const WaterfallLoad: EnhancedComponent<typeof _WaterfallLoad> =
  enhanceComponent(_WaterfallLoad)
export default Waterfall

export type {
  WaterfallProps,
  WaterfallSlots,
  WaterfallEmits,
  WaterfallExpose,
  WaterfallItemProps,
  WaterfallItemSlots,
  WaterfallItemEmits,
  WaterfallItemExpose,
  WaterfallLoadProps,
  WaterfallLoadSlots,
  WaterfallLoadEmits,
  WaterfallLoadExpose,
} from './common'
