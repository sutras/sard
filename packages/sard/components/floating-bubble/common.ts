import { type DefaultProps } from '../config'

export interface FloatingBubbleProps {
  draggable?: boolean
  axis?: 'x' | 'y' | 'both' | 'none'
  magnet?: 'x' | 'y'
  marginX?: number
  marginY?: number
  offset?: { x: number; y: number }
}

export const defaultFloatingBubbleProps: DefaultProps<FloatingBubbleProps> = {
  draggable: true,
  axis: 'y',
  marginX: 24,
  marginY: 24,
}

export interface FloatingBubbleSlots {
  default?(props: Record<string, never>): any
}

export interface FloatingBubbleEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:offset', offset: { x: number; y: number }): void
}
