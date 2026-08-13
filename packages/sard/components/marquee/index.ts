import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Marquee from './marquee.vue'

export const Marquee: EnhancedComponent<typeof _Marquee> = enhanceComponent(_Marquee)
export default Marquee

export type { MarqueeProps, MarqueeSlots, MarqueeExpose } from './common'
