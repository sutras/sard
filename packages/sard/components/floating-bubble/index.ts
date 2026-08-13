import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _FloatingBubble from './floating-bubble.vue'

export const FloatingBubble: EnhancedComponent<typeof _FloatingBubble> =
  enhanceComponent(_FloatingBubble)
export default FloatingBubble

export type { FloatingBubbleProps, FloatingBubbleSlots, FloatingBubbleEmits } from './common'
