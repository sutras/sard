import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimePickerPopout from './datetime-picker-popout.vue'

export const DatetimePickerPopout: EnhancedComponent<typeof _DatetimePickerPopout> =
  enhanceComponent(_DatetimePickerPopout)
export default DatetimePickerPopout

export type {
  DatetimePickerPopoutProps,
  DatetimePickerPopoutSlots,
  DatetimePickerPopoutEmits,
  DatetimePickerPopoutExpose,
} from './common'
