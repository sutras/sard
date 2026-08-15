import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _SwipeAction from './swipe-action.vue'

export const SwipeAction: EnhancedComponent<typeof _SwipeAction> = enhanceComponent(_SwipeAction)
export default SwipeAction

export type {
  SwipeActionProps,
  SwipeActionSlots,
  SwipeActionEmits,
  SwipeActionExpose,
  SwipeActionVisible,
  SwipeActionAsyncHide,
} from './common'
