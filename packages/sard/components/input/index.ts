import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Input from './input.vue'

export const Input: EnhancedComponent<typeof _Input> = enhanceComponent(_Input)
export default Input

export type { InputProps, InputSlots, InputEmits } from './common'
