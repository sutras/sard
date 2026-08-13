import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { type TransitionHookCallbacks } from '../popup/common'
import { type ActionSheetExpose, type ActionSheetItemProps, type ActionSheetProps } from './common'
import ActionSheet from './action-sheet.vue'

export interface ActionSheetOptions extends ActionSheetProps, TransitionHookCallbacks {
  onClose?: () => void
  onCancel?: () => void
  onSelect?: (item: ActionSheetItemProps) => void
}

export interface ActionSheetShowFunction {
  (options?: ActionSheetOptions): void
}

export interface ActionSheetSimpleShowFunction {
  (options: ActionSheetOptions): void
}

export type ActionSheetFunction = ActionSheetSimpleShowFunction & {
  hide: () => void
}

export function createActionSheet(defaultOptions?: ActionSheetOptions): ActionSheetFunction {
  const imperative = createImperativeComponent<ActionSheetOptions, ActionSheetExpose>(
    ActionSheet,
    defaultOptions,
  )

  const show: ActionSheetShowFunction = (options) => {
    imperative.show(options)
  }

  const hide = () => {
    imperative.hide()
  }

  const actionSheet: ActionSheetFunction = (options) => {
    show(options)
  }

  actionSheet.hide = hide

  return actionSheet
}

export const actionSheet = createActionSheet()
