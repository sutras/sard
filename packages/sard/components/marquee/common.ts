import { type DefaultProps } from '../config'

export interface MarqueeProps {
  direction?: 'vertical' | 'horizontal'
  speed?: number
}

export const defaultMarqueeProps: DefaultProps<MarqueeProps> = {
  direction: 'vertical',
  speed: 50,
}

export interface MarqueeSlots {
  default?(props: Record<string, never>): any
}

export interface MarqueeExpose {}
