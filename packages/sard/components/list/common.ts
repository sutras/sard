import { type InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface ListProps {
  title?: string | number
  description?: string | number
  inlaid?: boolean
  card?: boolean
  hideBorder?: boolean
}

export interface ListSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
}

export interface ListItemProps {
  title?: string | number
  description?: string | number
  value?: string | number
  hover?: boolean
  arrow?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
}

export const defaultListItemProps: DefaultProps<ListItemProps> = {
  arrowDirection: 'right',
}

export interface ListItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ListItemSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
  value?(props: Record<string, never>): any
  arrow?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export interface ListContext {
  hideBorder?: boolean
}

export const listContextKey = Symbol('listContext') as InjectionKey<ListContext>
