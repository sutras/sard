import { type DefaultProps } from '../config'

export interface CoolIconProps {
  shape?: 'circle' | 'square' | 'oval' | 'triangle' | 'flower'
  size?: string
  iconSize?: string
  color?: string
  background?: string
}

export const defaultCoolIconProps: DefaultProps<CoolIconProps> = {
  shape: 'oval',
}

export interface CoolIconSlots {
  default?(props: Record<string, never>): any
}

export interface CoolIconEmits {
  (e: 'click', event: MouseEvent): void
}

export interface CoolIconExpose {}
