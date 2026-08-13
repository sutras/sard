import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _RadioInput from './radio-input.vue'

export const RadioInput: EnhancedComponent<typeof _RadioInput> = enhanceComponent(_RadioInput)
export default RadioInput

export type { RadioInputProps, RadioInputEmits } from './common'
