import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PullDownRefresh from './pull-down-refresh.vue'

export const PullDownRefresh: EnhancedComponent<typeof _PullDownRefresh> =
  enhanceComponent(_PullDownRefresh)
export default PullDownRefresh

export type {
  PullDownRefreshStatus,
  PullDownRefreshProps,
  PullDownRefreshSlots,
  PullDownRefreshEmits,
  PullDownRefreshExpose,
} from './common'
