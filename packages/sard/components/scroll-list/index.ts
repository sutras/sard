import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ScrollList from './scroll-list.vue'

export const ScrollList: EnhancedComponent<typeof _ScrollList> = enhanceComponent(_ScrollList)
export default ScrollList

export type { ScrollListProps, ScrollListSlots, ScrollListEmits, ScrollListExpose } from './common'
