import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Select from './select.vue'
import _SelectOption from './select-option.vue'
import _SelectOptionGroup from './select-option-group.vue'

export const Select: EnhancedComponent<typeof _Select> = enhanceComponent(_Select)
export const SelectOption: EnhancedComponent<typeof _SelectOption> = enhanceComponent(_SelectOption)
export const SelectOptionGroup: EnhancedComponent<typeof _SelectOptionGroup> =
  enhanceComponent(_SelectOptionGroup)
export default Select

export type {
  SelectProps,
  SelectSlots,
  SelectEmits,
  SelectExpose,
  SelectOptionProps,
  SelectOptionSlots,
  SelectOptionEmits,
  SelectOptionExpose,
  SelectOptionGroupProps,
  SelectOptionGroupSlots,
  SelectOptionGroupEmits,
  SelectOptionGroupExpose,
} from './common'
