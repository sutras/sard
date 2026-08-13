import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Calendar from './calendar.vue'

export const Calendar: EnhancedComponent<typeof _Calendar> = enhanceComponent(_Calendar)
export default Calendar

export type {
  CalendarDay,
  CalendarType,
  CalendarProps,
  CalendarEmits,
  CalendarMonthProps,
  CalendarMonthEmits,
} from './common'
