import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ProgressBar from './progress-bar.vue'

export const ProgressBar: EnhancedComponent<typeof _ProgressBar> = enhanceComponent(_ProgressBar)
export default ProgressBar

export type { ProgressBarProps, ProgressBarSlots } from './common'
