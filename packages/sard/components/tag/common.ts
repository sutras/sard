import { type DefaultProps } from '../config'

export interface TagProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  variant?: 'filled' | 'solid' | 'outlined'
  round?: boolean
  mark?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
}

export const defaultTagProps: DefaultProps<TagProps> = {
  color: 'default',
  variant: 'filled',
  size: 'medium',
}

export interface TagSlots {
  default?(props: Record<string, never>): any
}

export interface TagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close', event: any): void
}
