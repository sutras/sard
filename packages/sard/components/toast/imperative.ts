import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { isConfigObject } from '../../utils/is'
import type { TransitionHookCallbacks } from '../popup/common'
import type { ToastExpose, ToastProps } from './common'
import Toast from './toast.vue'

export interface ToastOptions extends ToastProps, TransitionHookCallbacks {}

export interface ToastShowFunction {
  (
    optionsOrTitle?: string | number | ToastOptions,
    options?: ToastOptions,
    internalType?: ToastOptions['type'],
  ): void
}

export interface ToastSimpleShowFunction {
  (optionsOrTitle?: string | number | ToastOptions, options?: ToastOptions): void
}

export type ToastFunction = ToastSimpleShowFunction & {
  success: ToastSimpleShowFunction
  fail: ToastSimpleShowFunction
  loading: ToastSimpleShowFunction
  hide: () => void
}

export function createToast(defaultOptions?: ToastOptions): ToastFunction {
  const imperative = createImperativeComponent<ToastOptions, ToastExpose>(Toast, defaultOptions, {
    onShow(expose) {
      expose.reHideLater()
    },
    onHide(expose) {
      expose.cancelHide()
    },
  })

  const show: ToastShowFunction = (optionsOrTitle, options = {}, internalType) => {
    if (isConfigObject(optionsOrTitle)) {
      options = optionsOrTitle as ToastOptions
    } else {
      options.title = optionsOrTitle as string | number
    }

    options.type = internalType

    imperative.show(options as Record<string, unknown>)
  }

  const success: ToastSimpleShowFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, 'success')
  }

  const fail: ToastSimpleShowFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, 'fail')
  }

  const loading: ToastSimpleShowFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, 'loading')
  }

  const hide = () => {
    imperative.hide()
  }

  const toast: ToastFunction = (optionsOrTitle, options) => {
    show(optionsOrTitle, options, 'text')
  }

  toast.success = success
  toast.fail = fail
  toast.loading = loading
  toast.hide = hide

  return toast
}

export const toast = createToast()
