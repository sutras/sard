import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PickerInput from './picker-input.vue'

export const PickerInput: EnhancedComponent<typeof _PickerInput> = enhanceComponent(_PickerInput)
export default PickerInput

export type { PickerInputProps, PickerInputEmits } from './common'
