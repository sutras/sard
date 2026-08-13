import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _StatusBar from './status-bar.vue'

export const StatusBar: EnhancedComponent<typeof _StatusBar> = enhanceComponent(_StatusBar)
export default StatusBar

export type { StatusBarProps, StatusBarSlots, StatusBarEmits, StatusBarExpose } from './common'
