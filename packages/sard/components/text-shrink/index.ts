import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _TextShrink from './text-shrink.vue'

export const TextShrink: EnhancedComponent<typeof _TextShrink> = enhanceComponent(_TextShrink)
export default TextShrink

export type { TextShrinkProps, TextShrinkSlots, TextShrinkEmits, TextShrinkExpose } from './common'
