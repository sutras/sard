import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface ToastProps {
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string | number
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  timeout?: number
}

export const defaultToastProps: DefaultProps<ToastProps> = {
  type: 'text',
  position: 'center',
  overlay: false,
  transparent: false,
  timeout: 1500,
}

export interface ToastSlots {
  default?(props?: any): any
  icon?(props?: any): any
  title?(props?: any): any
}

export interface ToastEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
