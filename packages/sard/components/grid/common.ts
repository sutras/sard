import { type DefaultProps } from '../config'
import { type BadgeProps } from '../badge'
import type { StyleValue } from 'vue'

export interface GridProps {
  columns?: number
  gap?: number
  bordered?: boolean
  square?: boolean
  clickable?: boolean
  reverse?: boolean
  direction?: 'horizontal' | 'vertical'
}

export const defaultGridProps: DefaultProps<GridProps> = {
  columns: 4,
  gap: 0,
  direction: 'vertical',
}

export interface GridSlots {
  default?(props: Record<string, never>): any
}

export interface GridItemProps {
  contentStyle?: StyleValue
  contentClass?: string
  text?: string
  dot?: boolean
  badge?: number | string
  badgeProps?: BadgeProps
}

export interface GridItemSlots {
  default?(props: Record<string, never>): any
  content?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  text?(props: Record<string, never>): any
}

export interface GridItemEmits {
  (e: 'click', event: MouseEvent): void
}
