import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PasswordInput from './password-input.vue'

export const PasswordInput: EnhancedComponent<typeof _PasswordInput> =
  enhanceComponent(_PasswordInput)
export default PasswordInput

export type { PasswordInputProps, PasswordInputEmits } from './common'
