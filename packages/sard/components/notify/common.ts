import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface NotifyProps {
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: string
  color?: string
  background?: string
  visible?: boolean
  position?: 'top' | 'bottom'
  timeout?: number
  statusBar?: boolean
}

export const defaultNotifyProps: DefaultProps<NotifyProps> = {
  type: 'primary',
  position: 'top',
  timeout: 3000,
  statusBar: true,
}

export interface NotifySlots {
  default?(props: Record<string, never>): any
}

export interface NotifyEmits extends MotionEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:visible', visible: boolean): void
}

export interface NotifyExpose {
  reHideLater: () => void
  cancelHide: () => void
}
