import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ActionSheet from './action-sheet.vue'
import _ActionSheetItem from './action-sheet-item.vue'

export const ActionSheet: EnhancedComponent<typeof _ActionSheet> = enhanceComponent(_ActionSheet)
export const ActionSheetItem: EnhancedComponent<typeof _ActionSheetItem> =
  enhanceComponent(_ActionSheetItem)
export default ActionSheet

export type {
  ActionSheetProps,
  ActionSheetEmits,
  ActionSheetSlots,
  ActionSheetItemProps,
  ActionSheetItemEmits,
  ActionSheetItemSlots,
  ActionSheetBeforeClose,
} from './common'

export * from './imperative'

export type { ActionSheetContext } from './context'
