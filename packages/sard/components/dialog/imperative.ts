import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { type TransitionHookCallbacks } from '../popup/common'
import { type DialogExpose, type DialogProps } from './common'
import Dialog from './dialog.vue'

export interface DialogOptions extends DialogProps, TransitionHookCallbacks {
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: () => void
}

export interface DialogSimpleShowFunction {
  (optionsOrTitle: string | DialogOptions, options?: DialogOptions): void
}

export interface DialogShowFunction {
  (
    optionsOrTitle: string | DialogOptions,
    options?: DialogOptions,
    internalOptions?: DialogOptions,
  ): void
}

export type DialogFunction = DialogSimpleShowFunction & {
  alert: DialogSimpleShowFunction
  confirm: DialogSimpleShowFunction
  hide: () => void
}

const defaultDialogOptions: DialogOptions = {
  headed: false,
  buttonType: 'text',
  showCancel: false,
}

export function createDialog(defaultOptions?: DialogOptions): DialogFunction {
  const imperative = createImperativeComponent<DialogOptions, DialogExpose>(Dialog, defaultOptions)

  const show: DialogShowFunction = (optionsOrTitle, options = {}, internalOptions) => {
    if (optionsOrTitle && typeof optionsOrTitle === 'object') {
      options = optionsOrTitle as DialogOptions
    } else {
      options.title = optionsOrTitle as string
    }

    options = Object.assign({}, defaultDialogOptions, options, internalOptions)

    imperative.show(options)
  }

  const alert: DialogSimpleShowFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, { showCancel: false })
  }

  const confirm: DialogSimpleShowFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, {
      showCancel: true,
    })
  }

  const hide = () => {
    imperative.hide()
  }

  const dialog: DialogFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, { showCancel: false })
  }

  dialog.alert = alert
  dialog.confirm = confirm
  dialog.hide = hide

  return dialog
}

export const dialog = createDialog(defaultDialogOptions)
