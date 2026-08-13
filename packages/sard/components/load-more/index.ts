import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _LoadMore from './load-more.vue'

export const LoadMore: EnhancedComponent<typeof _LoadMore> = enhanceComponent(_LoadMore)
export default LoadMore

export type { LoadMoreStatus, LoadMoreProps, LoadMoreSlots, LoadMoreEmits } from './common'

export * from './useLoadMore'
