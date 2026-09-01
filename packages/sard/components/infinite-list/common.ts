import { type DefaultProps } from '../config'
import type { LoadMoreStatus } from '../load-more'
import type { PullDownRefreshSlots } from '../pull-down-refresh/common'

export interface InfiniteListProps {
  status?: LoadMoreStatus
  request: (page: number) => Promise<boolean>
  hideLoadMore?: boolean
  refreshable?: boolean
  rootMargin?: string
}

export const defaultInfiniteListProps: DefaultProps<InfiniteListProps> = {}

export interface InfiniteListSlots extends Omit<PullDownRefreshSlots, 'default'> {
  default?(props: Record<string, never>): any
}

export interface InfiniteListEmits {
  (e: 'load'): void
}

export interface InfiniteListExpose {}
