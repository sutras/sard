import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimeRangePicker from './datetime-range-picker.vue'

export const DatetimeRangePicker: EnhancedComponent<typeof _DatetimeRangePicker> =
  enhanceComponent(_DatetimeRangePicker)
export default DatetimeRangePicker

export type {
  DatetimeRangePickerProps,
  DatetimeRangePickerSlots,
  DatetimeRangePickerEmits,
} from './common'
