import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimePicker from './datetime-picker.vue'

export const DatetimePicker: EnhancedComponent<typeof _DatetimePicker> =
  enhanceComponent(_DatetimePicker)
export default DatetimePicker

export type {
  DatetimePickerProps,
  DatetimePickerEmits,
  DatetimeLetter,
  DateEvery,
  DatetimeColumnOption,
} from './common'
