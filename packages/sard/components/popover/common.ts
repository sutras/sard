import type { PopperPosition, PopperTarget } from '../../use'
import { type DefaultProps } from '../config'

export interface PopoverProps {
  visible?: boolean
  position?: PopperPosition
  theme?: 'dark' | 'light'
  refGap?: number
  viewportGap?: number
  reference?: PopperTarget | Element | null
  outsideClosable?: boolean
  showArrow?: boolean
}

export const defaultPopoverProps: DefaultProps<PopoverProps> = {
  position: 'bottom',
  theme: 'light',
  refGap: 10,
  viewportGap: 10,
  outsideClosable: true,
  showArrow: false,
}

export interface PopoverSlots {
  default?(props: Record<string, never>): any
  reference?(props: Record<string, never>): any
}

export interface PopoverEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface ReferenceExpose {}
