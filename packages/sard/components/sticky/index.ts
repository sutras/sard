import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Sticky from './sticky.vue'
import _StickyBox from './sticky-box.vue'

export const Sticky: EnhancedComponent<typeof _Sticky> = enhanceComponent(_Sticky)
export const StickyBox: EnhancedComponent<typeof _StickyBox> = enhanceComponent(_StickyBox)
export default Sticky

export type {
  StickyProps,
  StickySlots,
  StickyEmits,
  StickyExpose,
  StickyBoxProps,
  StickyBoxSlots,
  StickyBoxEmits,
  StickyBoxExpose,
} from './common'
