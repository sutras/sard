import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ShareSheet from './share-sheet.vue'
import _ShareSheetRow from './share-sheet-row.vue'
import _ShareSheetItem from './share-sheet-item.vue'
import _ShareSheetIcon from './share-sheet-icon.vue'

export const ShareSheet: EnhancedComponent<typeof _ShareSheet> = enhanceComponent(_ShareSheet)
export const ShareSheetRow: EnhancedComponent<typeof _ShareSheetRow> =
  enhanceComponent(_ShareSheetRow)
export const ShareSheetItem: EnhancedComponent<typeof _ShareSheetItem> =
  enhanceComponent(_ShareSheetItem)
export const ShareSheetIcon: EnhancedComponent<typeof _ShareSheetIcon> =
  enhanceComponent(_ShareSheetIcon)
export default ShareSheet

export type {
  ShareSheetProps,
  ShareSheetEmits,
  ShareSheetSlots,
  ShareSheetExpose,
  ShareSheetItemProps,
  ShareSheetItemEmits,
  ShareSheetItemSlots,
  ShareSheetRowProps,
  ShareSheetRowSlots,
  ShareSheetRowEmits,
  ShareSheetRowExpose,
  ShareSheetIconProps,
  ShareSheetIconSlots,
  ShareSheetbeforeClose,
} from './common'

export type { ShareSheetContext } from './context'
