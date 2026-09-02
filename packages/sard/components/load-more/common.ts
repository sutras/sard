import { type DefaultProps } from '../config'

export enum LoadMoreStatus {
  INCOMPLETE = 'incomplete',
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export interface LoadMoreProps {
  status?: LoadMoreStatus
  incompleteText?: string
  loadingText?: string
  completeText?: string
  errorText?: string
  disabled?: boolean
  rootMargin?: string
  invisible?: boolean
}

export const defaultLoadMoreProps: DefaultProps<LoadMoreProps> = {
  status: LoadMoreStatus.INCOMPLETE,
}

export interface LoadMoreSlots {
  incomplete?(props: Record<string, never>): any
  loading?(props: Record<string, never>): any
  complete?(props: Record<string, never>): any
  error?(props: Record<string, never>): any
}

export interface LoadMoreEmits {
  (e: 'load'): void
}
