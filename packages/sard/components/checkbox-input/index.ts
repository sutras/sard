import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CheckboxInput from './checkbox-input.vue'

export const CheckboxInput: EnhancedComponent<typeof _CheckboxInput> =
  enhanceComponent(_CheckboxInput)
export default CheckboxInput

export type { CheckboxInputProps, CheckboxInputEmits } from './common'
