import { type DefaultProps } from '../config'
import type { CountDownCurrentTime } from './useCountDown'

export interface CountDownProps {
  time?: number
  autoStart?: boolean
  format?: string
  millisecond?: boolean
}

export const defaultCountDownProps: DefaultProps<CountDownProps> = {
  time: 0,
  autoStart: true,
  format: 'HH:mm:ss',
}

export interface CountDownSlots {
  default?(props: { time: CountDownCurrentTime }): any
}

export interface CountDownEmits {
  (e: 'change', time: CountDownCurrentTime): void
  (e: 'finish'): void
}

export interface CountDownExpose {
  start: () => void
  pause: () => void
  reset: () => void
}
