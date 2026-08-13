import { type DefaultProps } from '../config'

export interface ButtonProps {
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white' | 'black'
  size?: 'xs' | 'small' | 'medium' | 'large'
  round?: boolean
  square?: boolean
  disabled?: boolean
  loading?: boolean
  loadingType?: 'clock' | 'circular'
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  ghost?: boolean
  autoHeight?: boolean
  compact?: boolean
}

export const defaultButtonProps: DefaultProps<ButtonProps> = {
  variant: 'solid',
  color: 'primary',
  size: 'medium',
  htmlType: 'button',
}

export interface ButtonSlots {
  default?(): any
  icon?(): any
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
