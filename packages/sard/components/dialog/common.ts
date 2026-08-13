import { type DefaultProps } from '../config'
import { type ButtonProps } from '../button'
import type { MotionEmits } from '../motion'

export type DialogBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any

export interface DialogProps {
  visible?: boolean
  title?: string
  message?: string
  headed?: boolean
  buttonType?: 'round' | 'text'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  overlayClosable?: boolean
  beforeClose?: DialogBeforeClose
  cancelProps?: ButtonProps
  confirmProps?: ButtonProps
}

export const defaultDialogProps: DefaultProps<DialogProps> = {
  headed: true,
  buttonType: 'round',
  showCancel: true,
  showConfirm: true,
  overlayClosable: true,
}

export interface DialogSlots {
  default?(props: Record<string, never>): any
}

export interface DialogEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}

export interface DialogExpose {}
