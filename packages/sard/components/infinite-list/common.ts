import { type DefaultProps } from '../config'
import type { LoadMoreStatus } from '../load-more/common'
import type { PullDownRefreshSlots } from '../pull-down-refresh/common'

export interface InfiniteListProps {
  request: (page: number, isRefresh: boolean) => Promise<boolean>
  hideLoadMore?: boolean
  refreshable?: boolean
  doneDuration?: number
  rootMargin?: string
}

export const defaultInfiniteListProps: DefaultProps<InfiniteListProps> = {
  doneDuration: 500,
}

export interface InfiniteListSlots extends Omit<PullDownRefreshSlots, 'default'> {
  default?(props: { status: LoadMoreStatus; refresh: () => void }): any
}

export interface InfiniteListEmits {
  (e: 'refresh-success'): void
  (e: 'refresh-error'): void
}

export interface InfiniteListExpose {
  refresh: () => void
}
