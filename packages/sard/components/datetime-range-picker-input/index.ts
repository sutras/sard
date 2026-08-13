import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimeRangePickerInput from './datetime-range-picker-input.vue'

export const DatetimeRangePickerInput: EnhancedComponent<typeof _DatetimeRangePickerInput> =
  enhanceComponent(_DatetimeRangePickerInput)
export default DatetimeRangePickerInput

export type { DatetimeRangePickerInputProps, DatetimeRangePickerInputEmits } from './common'
