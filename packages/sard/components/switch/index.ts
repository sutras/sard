import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Switch from './switch.vue'

export const Switch: EnhancedComponent<typeof _Switch> = enhanceComponent(_Switch)
export default Switch

export type { SwitchProps, SwitchEmits } from './common'
