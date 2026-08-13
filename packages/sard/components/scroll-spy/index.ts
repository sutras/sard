import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ScrollSpy from './scroll-spy.vue'
import _ScrollSpyAnchor from './scroll-spy-anchor.vue'

export const ScrollSpy: EnhancedComponent<typeof _ScrollSpy> = enhanceComponent(_ScrollSpy)
export const ScrollSpyAnchor: EnhancedComponent<typeof _ScrollSpyAnchor> =
  enhanceComponent(_ScrollSpyAnchor)
export default ScrollSpy

export type {
  ScrollSpyProps,
  ScrollSpySlots,
  ScrollSpyEmits,
  ScrollSpyExpose,
  ScrollSpyAnchorProps,
  ScrollSpyAnchorSlots,
  ScrollSpyAnchorEmits,
  ScrollSpyAnchorExpose,
} from './common'
