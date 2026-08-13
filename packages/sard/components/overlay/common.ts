import { type DefaultProps } from '../config'

export interface OverlayProps {
  visible?: boolean
  zIndex?: number
  background?: string
  transparent?: boolean
}

export const defaultOverlayProps: DefaultProps<OverlayProps> = {}

export interface OverlaySlots {
  default?(props: Record<string, never>): any
}

export interface OverlayEmits {
  (e: 'click', event: MouseEvent): void
}
