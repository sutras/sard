import { type DefaultProps } from '../config'

export interface AlertProps {
  showIcon?: boolean
  closable?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger'
  color?: string
  background?: string
  square?: boolean
}

export const defaultAlertProps: DefaultProps<AlertProps> = {
  type: 'primary',
}

export interface AlertSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export interface AlertEmits {
  (e: 'close'): void
}
