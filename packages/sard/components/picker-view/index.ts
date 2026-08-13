import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PickerView from './picker-view'
import _PickerViewColumn from './picker-view-column'

export const PickerView: EnhancedComponent<typeof _PickerView> = enhanceComponent(_PickerView)
export const PickerViewColumn: EnhancedComponent<typeof _PickerViewColumn> =
  enhanceComponent(_PickerViewColumn)
export default PickerView

export type {
  PickerViewProps,
  PickerViewSlots,
  PickerViewEmits,
  PickerViewExpose,
  PickerViewColumnProps,
  PickerViewColumnSlots,
  PickerViewColumnEmits,
  PickerViewColumnExpose,
} from './common'
