import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CalendarInput from './calendar-input.vue'

export const CalendarInput: EnhancedComponent<typeof _CalendarInput> =
  enhanceComponent(_CalendarInput)
export default CalendarInput

export type { CalendarInputProps, CalendarInputEmits } from './common'
