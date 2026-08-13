import { type DefaultProps } from '../config'

export interface BackTopProps {
  scrollTop?: number
  visibleHeight?: number
  right?: string
  bottom?: string
}

export const defaultBackTopProps: DefaultProps<BackTopProps> = {
  visibleHeight: 200,
  scrollTop: 0,
}

export interface BackTopSlots {
  default?(props: Record<string, never>): any
}

export interface BackTopEmits {
  (e: 'click', event: MouseEvent): void
}
