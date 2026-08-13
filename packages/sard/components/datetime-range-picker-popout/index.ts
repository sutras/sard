import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DatetimeRangePickerPopout from './datetime-range-picker-popout.vue'

export const DatetimeRangePickerPopout: EnhancedComponent<typeof _DatetimeRangePickerPopout> =
  enhanceComponent(_DatetimeRangePickerPopout)
export default DatetimeRangePickerPopout

export type {
  DatetimeRangePickerPopoutProps,
  DatetimeRangePickerPopoutSlots,
  DatetimeRangePickerPopoutEmits,
  DatetimeRangePickerPopoutExpose,
} from './common'
