import type { InjectionKey } from 'vue'
import type { DefaultProps } from '../config'

export type SwipeActionVisible = 'left' | 'right' | false

export interface SwipeActionProps {
  disabled?: boolean
  visible?: SwipeActionVisible
}

export interface SwipeActionSlots {
  default?(props: Record<string, never>): any
  left?(props: { hide: () => void }): any
  right?(props: { hide: () => void }): any
}

export interface SwipeActionEmits {
  (e: 'update:visible', value: SwipeActionVisible): void
}

export interface SwipeActionExpose {
  hide: () => void
}

export interface SwipeActionGroupProps {
  multiple?: boolean
}

export const defaultSwipeActionGroupProps: DefaultProps<SwipeActionGroupProps> = {
  multiple: false,
}

export interface SwipeActionGroupSlots {
  default?(props: Record<string, never>): any
}

export interface SwipeActionGroupExpose {
  closeAll: () => void
}

export interface SwipeActionGroupContext {
  multiple: SwipeActionGroupProps['multiple']
  register: (id: string, expose: SwipeActionExpose) => void
  unregister: (id: string) => void
  closeAll: (exceptId?: string) => void
}

export const swipeActionGroupContextKey = Symbol(
  'swipeActionGroupContext',
) as InjectionKey<SwipeActionGroupContext>
