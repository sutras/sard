import { type DefaultProps } from '../config'

export type ButtonType = 'primary' | 'secondary' | 'dashed' | 'text' | 'link'

export interface ButtonProps {
  /**
   * color 与 variant 的语法糖，优先级高于两者。
   */
  type?: ButtonType
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

/** type 到 color + variant 的映射 */
export const buttonTypeMap: Record<
  ButtonType,
  { color: NonNullable<ButtonProps['color']>; variant: NonNullable<ButtonProps['variant']> }
> = {
  primary: { color: 'primary', variant: 'solid' },
  secondary: { color: 'secondary', variant: 'outlined' },
  dashed: { color: 'secondary', variant: 'dashed' },
  text: { color: 'secondary', variant: 'link' },
  link: { color: 'primary', variant: 'link' },
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
