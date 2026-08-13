import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimePickerInput from './datetime-picker-input.vue'

export const DatetimePickerInput: EnhancedComponent<typeof _DatetimePickerInput> =
  enhanceComponent(_DatetimePickerInput)
export default DatetimePickerInput

export type { DatetimePickerInputProps, DatetimePickerInputEmits } from './common'
