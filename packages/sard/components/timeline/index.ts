import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Timeline from './timeline.vue'
import _TimelineItem from './timeline-item.vue'

export const Timeline: EnhancedComponent<typeof _Timeline> = enhanceComponent(_Timeline)
export const TimelineItem: EnhancedComponent<typeof _TimelineItem> = enhanceComponent(_TimelineItem)
export default Timeline

export type { TimelineProps, TimelineSlots } from './common'
