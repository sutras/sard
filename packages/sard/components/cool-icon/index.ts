import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CoolIcon from './cool-icon.vue'

export const CoolIcon: EnhancedComponent<typeof _CoolIcon> = enhanceComponent(_CoolIcon)
export default CoolIcon

export type { CoolIconProps, CoolIconSlots, CoolIconEmits, CoolIconExpose } from './common'
