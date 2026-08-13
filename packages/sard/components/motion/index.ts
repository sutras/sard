import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Motion from './motion.vue'

export const Motion: EnhancedComponent<typeof _Motion> = enhanceComponent(_Motion)
export default Motion

export type { MotionProps, MotionSlots, MotionEmits, MotionHookName, MotionName } from './common'

export * from './useMotioning'
