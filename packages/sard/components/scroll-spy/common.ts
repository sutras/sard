import type { InjectionKey } from 'vue'

export interface ScrollSpyProps {
  modelValue?: string | number
  offset?: number
  disabled?: boolean
}

export interface ScrollSpySlots {
  default?(props: Record<string, never>): any
}

export interface ScrollSpyEmits {
  (e: 'update:modelValue', value: number | string): void
  (e: 'change', value: number | string): void
}

export interface ScrollSpyExpose {
  scrollTo: (name: string | number) => void
  update: () => void
}

export interface ScrollSpyContext {
  register: (name: string | number, getRect: () => DOMRect) => void
  unregister: (name: string | number) => void
}

export const scrollSpyContextKey = Symbol('scrollSpyContext') as InjectionKey<ScrollSpyContext>

export interface ScrollSpyAnchorProps {
  name: string | number
}

export interface ScrollSpyAnchorSlots {
  default?(props: Record<string, never>): any
}

export interface ScrollSpyAnchorEmits {}

export interface ScrollSpyAnchorExpose {}
