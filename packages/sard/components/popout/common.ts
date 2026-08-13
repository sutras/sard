import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export type PopoutBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any

export interface PopoutProps {
  visible?: boolean
  title?: string
  type?: 'compact' | 'loose'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  confirmDisabled?: boolean
  showClose?: boolean
  showFooter?: boolean
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: string
  background?: string
  transparent?: boolean
  overlayClosable?: boolean
  beforeClose?: PopoutBeforeClose
  showShadow?: boolean
  destroyOnClose?: boolean
  lazy?: boolean
}

export const defaultPopoutProps: DefaultProps<PopoutProps> = {
  type: 'compact',
  showCancel: undefined,
  showConfirm: true,
  showClose: true,
  showFooter: true,
  overlay: true,
  overlayClosable: true,
  lazy: undefined,
  destroyOnClose: undefined,
}

export interface PopoutSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  cancel?(props: { onClick: () => void; loading: boolean; text: string }): any
  confirm?(props: { onClick: () => void; loading: boolean; text: string; disabled?: boolean }): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface PopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
