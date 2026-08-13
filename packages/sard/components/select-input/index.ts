import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _SelectInput from './select-input.vue'

export const SelectInput: EnhancedComponent<typeof _SelectInput> = enhanceComponent(_SelectInput)
export default SelectInput

export type {
  SelectInputProps,
  SelectInputSlots,
  SelectInputEmits,
  SelectInputExpose,
} from './common'
