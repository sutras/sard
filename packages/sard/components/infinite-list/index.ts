import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _InfiniteList from './infinite-list.vue'

export const InfiniteList: EnhancedComponent<typeof _InfiniteList> = enhanceComponent(_InfiniteList)
export default InfiniteList

export type {
  InfiniteListProps,
  InfiniteListSlots,
  InfiniteListEmits,
  InfiniteListExpose,
} from './common'
