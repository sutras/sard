import { ActionSheet as ActionSheetOrigin } from './ActionSheet'
import type {
  ActionSheetFC as ActionSheetOriginFC,
  ActionSheetProps,
  ActionSheetRef,
} from './ActionSheet'
import { ActionSheetAgent } from './Agent'
import { hide, hideAll, show } from './imperative'

interface ActionSheetFC extends ActionSheetOriginFC {
  show: typeof show
  hide: typeof hide
  hideAll: typeof hideAll
  Agent: typeof ActionSheetAgent
}

const ActionSheet = ActionSheetOrigin as ActionSheetFC

ActionSheet.show = show
ActionSheet.hide = hide
ActionSheet.hideAll = hideAll
ActionSheet.Agent = ActionSheetAgent

export { ActionSheet, ActionSheetProps, ActionSheetRef, ActionSheetAgent }

export default ActionSheet
