import { type DefaultProps } from '../config'

export interface ReadMoreProps {
  maxHeight?: number
  hideClose?: boolean
  openText?: string
  closeText?: string
  visible?: boolean
  keepLocation?: boolean
}

export const defaultReadMoreProps: DefaultProps<ReadMoreProps> = {
  maxHeight: 200,
  keepLocation: true,
}

export interface ReadMoreSlots {
  default?(props: Record<string, never>): any
}

export interface ReadMoreEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}

export interface ReadMoreExpose {}
