import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Button from './button.vue'

export const Button: EnhancedComponent<typeof _Button> = enhanceComponent(_Button)
export default Button

export type { ButtonProps, ButtonSlots, ButtonEmits } from './common'
