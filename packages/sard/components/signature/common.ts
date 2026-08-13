import { type DefaultProps } from '../config'

export interface SignatureProps {
  color?: string
  lineWidth?: number
  background?: string
  fullScreen?: boolean
  visible?: boolean
  cancelText?: string
  clearText?: string
  confirmText?: string
  type?: string
  quality?: number
}

export const defaultSignatureProps: DefaultProps<SignatureProps> = {
  lineWidth: 3,
  fullScreen: false,
  color: '#000',
  type: 'image/png',
  quality: 0.92,
}

export interface SignatureSlots {
  default?(props: Record<string, never>): any
}

export interface SignatureEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'confirm', dataURL: string): void
  (e: 'clear'): void
  (e: 'cancel'): void
}

export interface SignatureExpose {
  clear: () => void
  confirm: () => void
}
