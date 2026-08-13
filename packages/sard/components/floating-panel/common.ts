import { type DefaultProps } from '../config'

export interface FloatingPanelProps {
  height?: number
  anchors?: number[]
  duration?: number
  contentDraggable?: boolean
  safeAreaInsetBottom?: boolean
}

export const defaultFloatingPanelProps: DefaultProps<FloatingPanelProps> = {
  height: 0,
  duration: 300,
  contentDraggable: true,
  safeAreaInsetBottom: true,
}

export interface FloatingPanelSlots {
  default?(props: Record<string, never>): any
}

export interface FloatingPanelEmits {
  (e: 'update:height', value: number): void
  (e: 'height-change', value: number): void
}

export interface FloatingPanelExpose {}
