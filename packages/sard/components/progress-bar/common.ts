import { type DefaultProps } from '../config'

export interface ProgressBarProps {
  percent?: number
  inside?: boolean
  color?: string
  trackColor?: string
  thickness?: string
  showText?: boolean
  striped?: boolean
  animated?: boolean
  status?: 'success' | 'warning' | 'error'
}

export const defaultProgressBarProps: DefaultProps<ProgressBarProps> = {
  percent: 0,
  showText: true,
}

export interface ProgressBarSlots {
  default?(props: Record<string, never>): any
}
