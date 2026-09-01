import { type DefaultProps } from '../config'

export type PullDownRefreshStatus =
  | 'initial'
  | 'unready'
  | 'ready'
  | 'loading'
  | 'done'
  | 'recovering'

export interface PullDownRefreshProps {
  threshold?: number
  headerHeight?: number
  loading?: boolean
  transitionDuration?: number
  doneDuration?: number
  disabled?: boolean
  error?: boolean
}

export const defaultPullDownRefreshProps: DefaultProps<PullDownRefreshProps> = {
  threshold: 50,
  headerHeight: 50,
  transitionDuration: 300,
  doneDuration: 500,
  loading: false,
  disabled: false,
}

export interface PullDownRefreshSlots {
  default?(props: Record<string, never>): any
  unready?(props: { progress: number }): any
  ready?(props: Record<string, never>): any
  loading?(props: Record<string, never>): any
  done?(props: Record<string, never>): any
}

export interface PullDownRefreshEmits {
  (e: 'refresh'): void
}

export interface PullDownRefreshExpose {}
