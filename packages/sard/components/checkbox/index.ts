import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Checkbox from './checkbox.vue'
import _CheckboxGroup from './checkbox-group.vue'

export const Checkbox: EnhancedComponent<typeof _Checkbox> = enhanceComponent(_Checkbox)
export const CheckboxGroup: EnhancedComponent<typeof _CheckboxGroup> =
  enhanceComponent(_CheckboxGroup)
export default Checkbox

export type {
  CheckboxProps,
  CheckboxSlots,
  CheckboxEmits,
  CheckboxGroupProps,
  CheckboxGroupSlots,
  CheckboxGroupEmits,
} from './common'
