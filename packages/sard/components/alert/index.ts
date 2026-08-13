import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Alert from './alert.vue'

export const Alert: EnhancedComponent<typeof _Alert> = enhanceComponent(_Alert)
export default Alert

export type { AlertProps, AlertSlots, AlertEmits } from './common'
