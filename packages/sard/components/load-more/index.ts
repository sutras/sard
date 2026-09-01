import { enhanceComponent, type EnhancedComponent } from '../../utils'
import { LoadMoreStatus } from './common'
import _LoadMore from './load-more.vue'

export const LoadMore: EnhancedComponent<typeof _LoadMore> = enhanceComponent(_LoadMore)
export default LoadMore

export type { LoadMoreProps, LoadMoreSlots, LoadMoreEmits } from './common'

export { LoadMoreStatus }
