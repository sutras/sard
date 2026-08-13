import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _DateStrip from './date-strip.vue'

export const DateStrip: EnhancedComponent<typeof _DateStrip> = enhanceComponent(_DateStrip)
export default DateStrip

export type { CalendarDay, CalendarType } from '../calendar'

export type { DateStripProps, DateStripEmits } from './common'
