import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _NoticeBar from './notice-bar.vue'

export const NoticeBar: EnhancedComponent<typeof _NoticeBar> = enhanceComponent(_NoticeBar)
export default NoticeBar

export type { NoticeBarProps, NoticeBarSlots, NoticeBarEmits, NoticeBarExpose } from './common'
