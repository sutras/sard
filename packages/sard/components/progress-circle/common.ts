import { type DefaultProps } from '../config'

export interface ProgressCircleProps {
  percent?: number
  color?: string
  trackColor?: string
  thickness?: number
  size?: string
  status?: 'success' | 'warning' | 'error'
}

export const defaultProgressCircleProps: DefaultProps<ProgressCircleProps> = {
  percent: 0,
  thickness: 4,
}

export interface ProgressCircleSlots {
  default?(props: Record<string, never>): any
}
