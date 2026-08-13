import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Dropdown from './dropdown.vue'
import _DropdownItem from './dropdown-item.vue'

export const Dropdown: EnhancedComponent<typeof _Dropdown> = enhanceComponent(_Dropdown)
export const DropdownItem: EnhancedComponent<typeof _DropdownItem> = enhanceComponent(_DropdownItem)
export default Dropdown

export type {
  DropdownProps,
  DropdownSlots,
  DropdownItemProps,
  DropdownItemSlots,
  DropdownItemEmits,
  DropdownCloseType,
  DropdownBeforeClose,
} from './common'
