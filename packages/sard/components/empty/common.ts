import { type DefaultProps } from '../config'

export interface EmptyProps {
  description?: string
  size?: 'small' | 'medium'
  iconSize?: string | number
}

export const defaultEmptyProps: DefaultProps<EmptyProps> = {
  size: 'medium',
}

export interface EmptySlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
}
