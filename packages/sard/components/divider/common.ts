import { type DefaultProps } from '../config'

export interface DividerProps {
  type?: 'solid' | 'dashed' | 'dotted'
  hairline?: boolean
  position?: 'left' | 'right' | 'center'
  vertical?: boolean
}

export const defaultDividerProps: DefaultProps<DividerProps> = {
  type: 'solid',
  hairline: true,
  position: 'center',
}

export interface DividerSlots {
  default?(props: Record<string, never>): any
}

export interface DividerEmits {}

export interface DividerExpose {}
