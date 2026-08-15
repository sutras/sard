import type { DefaultProps } from '../config'

export type SwipeActionVisible = 'left' | 'right' | false

export type SwipeActionAsyncHide = (
  callback: (resolve: () => void, reject: () => void) => void,
) => void

export interface SwipeActionProps {
  disabled?: boolean
  visible?: SwipeActionVisible
  outsideClosable?: boolean
}

export const defaultSwipeActionProps: DefaultProps<SwipeActionProps> = {
  outsideClosable: true,
}

export interface SwipeActionSlots {
  default?(props: Record<string, never>): any
  left?(props: { hide: () => void; asyncHide: SwipeActionAsyncHide }): any
  right?(props: { hide: () => void; asyncHide: SwipeActionAsyncHide }): any
}

export interface SwipeActionEmits {
  (e: 'update:visible', value: SwipeActionVisible): void
}

export interface SwipeActionExpose {
  hide: () => void
}
