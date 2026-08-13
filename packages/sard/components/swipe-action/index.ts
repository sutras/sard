import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _SwipeAction from './swipe-action.vue'
import _SwipeActionGroup from './swipe-action-group.vue'

export const SwipeAction: EnhancedComponent<typeof _SwipeAction> = enhanceComponent(_SwipeAction)
export const SwipeActionGroup: EnhancedComponent<typeof _SwipeActionGroup> =
  enhanceComponent(_SwipeActionGroup)
export default SwipeAction

export type {
  SwipeActionProps,
  SwipeActionSlots,
  SwipeActionEmits,
  SwipeActionExpose,
  SwipeActionVisible,
  SwipeActionGroupProps,
  SwipeActionGroupSlots,
  SwipeActionGroupExpose,
} from './common'
