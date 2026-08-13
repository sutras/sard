import type { DefaultProps } from '../config'

export interface ScrollListProps {
  scrollbarBg?: string
  scrollbarWidth?: number
  thumbBg?: string
}

export const defaultScrollListProps: DefaultProps<ScrollListProps> = {}

export interface ScrollListSlots {
  default?(props: Record<string, never>): any
}

export interface ScrollListEmits {
  (e: 'scroll', event: Event): void
}

export interface ScrollListExpose {}
