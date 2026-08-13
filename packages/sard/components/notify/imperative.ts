import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { isConfigObject } from '../../utils/is'
import { type TransitionHookCallbacks } from '../popup/common'
import { type NotifyExpose, type NotifyProps } from './common'
import Notify from './notify.vue'

export interface NotifyOptions extends NotifyProps, TransitionHookCallbacks {}

export interface NotifySimpleShowFunction {
  (optionsOrMessage?: string | NotifyOptions, options?: NotifyOptions): void
}

export interface NotifyShowFunction {
  (
    optionsOrMessage?: string | NotifyOptions,
    options?: NotifyOptions,
    internalType?: NotifyOptions['type'],
  ): void
}

export type NotifyFunction = NotifySimpleShowFunction & {
  success: NotifySimpleShowFunction
  warning: NotifySimpleShowFunction
  error: NotifySimpleShowFunction
  hide: () => void
}

export function createNotify(defaultOptions?: NotifyOptions): NotifyFunction {
  const imperative = createImperativeComponent<NotifyOptions, NotifyExpose>(
    Notify,
    defaultOptions,
    {
      onShow(expose) {
        expose.reHideLater()
      },
      onHide(expose) {
        expose.cancelHide()
      },
    },
  )

  const show: NotifyShowFunction = (optionsOrMessage, options = {}, internalType) => {
    if (isConfigObject(optionsOrMessage)) {
      options = optionsOrMessage as NotifyOptions
    } else {
      options.message = optionsOrMessage as string
    }

    options.type = internalType

    imperative.show(options)
  }

  const notify: NotifyFunction = (optionsOrMessage, options) => {
    show(optionsOrMessage, options, 'primary')
  }

  const success: NotifySimpleShowFunction = (optionsOrMessage, options) => {
    show(optionsOrMessage, options, 'success')
  }

  const warning: NotifySimpleShowFunction = (optionsOrMessage, options) => {
    show(optionsOrMessage, options, 'warning')
  }

  const error: NotifySimpleShowFunction = (optionsOrMessage, options) => {
    show(optionsOrMessage, options, 'error')
  }

  const hide = () => {
    imperative.hide()
  }

  notify.success = success
  notify.warning = warning
  notify.error = error
  notify.hide = hide

  return notify
}

export const notify = createNotify()
