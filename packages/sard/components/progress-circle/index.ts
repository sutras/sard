import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ProgressCircle from './progress-circle.vue'

export const ProgressCircle: EnhancedComponent<typeof _ProgressCircle> =
  enhanceComponent(_ProgressCircle)
export default ProgressCircle

export type { ProgressCircleProps, ProgressCircleSlots } from './common'
