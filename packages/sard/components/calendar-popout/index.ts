import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CalendarPopout from './calendar-popout.vue'

export const CalendarPopout: EnhancedComponent<typeof _CalendarPopout> =
  enhanceComponent(_CalendarPopout)
export default CalendarPopout

export type {
  CalendarPopoutProps,
  CalendarPopoutSlots,
  CalendarPopoutEmits,
  CalendarPopoutExpose,
} from './common'
