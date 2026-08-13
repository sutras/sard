import type { DefaultProps } from '../config'

export interface MenuProps {
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
}

export const defaultMenuProps: DefaultProps<MenuProps> = {
  direction: 'vertical',
  theme: 'light',
}

export interface MenuSlots {
  default?(): any
}

export interface MenuEmits {
  (e: 'select', item: any): void
}

export interface MenuItemProps<T = any> {
  label?: string | number
  value?: T
  disabled?: boolean
}

export interface MenuItemSlots {
  default?(): any
  icon?(): any
}

export interface MenuItemEmits {
  (e: 'click', event: MouseEvent): void
}
