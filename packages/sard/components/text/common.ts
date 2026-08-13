import { type DefaultProps } from '../config'

export interface TextProps {
  color?:
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'fourth'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
  size?: 'small' | 'medium' | 'large'
  truncated?: boolean
  lineClamp?: number
  tag?: string
}

export const defaultTextProps: DefaultProps<TextProps> = {
  color: 'default',
  size: 'medium',
  truncated: false,
  tag: 'span',
}

export interface TextSlots {
  default?(props: Record<string, never>): any
}

export interface TextEmits {}

export interface TextExpose {}
