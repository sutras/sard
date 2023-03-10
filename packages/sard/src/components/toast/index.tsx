import { Toast as ToastOrigin } from './Toast'
import type { ToastFC as ToastOriginFC, ToastProps, ToastRef } from './Toast'
import { show, success, fail, loading, hide, hideAll } from './imperative'
import { ToastAgent } from './Agent'

interface ToastFC extends ToastOriginFC {
  show: typeof show
  success: typeof success
  fail: typeof fail
  loading: typeof loading
  hide: typeof hide
  hideAll: typeof hideAll
  Agent: typeof ToastAgent
}

const Toast = ToastOrigin as ToastFC

Toast.show = show
Toast.success = success
Toast.fail = fail
Toast.loading = loading
Toast.hide = hide
Toast.hideAll = hideAll
Toast.Agent = ToastAgent

export { Toast, ToastProps, ToastRef }

export default Toast
