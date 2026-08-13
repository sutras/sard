import { type DefaultProps } from '../config'

export type LoadMoreStatus = 'incomplete' | 'loading' | 'complete' | 'error'

export interface LoadMoreProps {
  status?: LoadMoreStatus
  incompleteText?: string
  loadingText?: string
  completeText?: string
  errorText?: string
}

export const defaultLoadMoreProps: DefaultProps<LoadMoreProps> = {
  status: 'incomplete',
}

export interface LoadMoreSlots {
  incomplete?(props: Record<string, never>): any
  loading?(props: Record<string, never>): any
  complete?(props: Record<string, never>): any
  error?(props: Record<string, never>): any
}

export interface LoadMoreEmits {
  (e: 'load-more'): void
  (e: 'reload'): void
}
