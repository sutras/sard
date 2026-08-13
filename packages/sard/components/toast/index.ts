import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Toast from './toast.vue'

export const Toast: EnhancedComponent<typeof _Toast> = enhanceComponent(_Toast)
export default Toast

export type { ToastProps, ToastSlots, ToastEmits, ToastExpose } from './common'
export * from './imperative'
