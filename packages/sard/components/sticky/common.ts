import type { InjectionKey, MaybeRefOrGetter } from 'vue'

export interface StickyProps {
  marginTop?: number
  marginBottom?: number
  zIndex?: number | string
}

export interface StickySlots {
  default?(props: Record<string, never>): any
}

export interface StickyEmits {}

export interface StickyExpose {}

export interface StickyBoxProps {}

export interface StickyBoxSlots {
  default?(props: Record<string, never>): any
}

export interface StickyBoxEmits {}

export interface StickyBoxExpose {}

export const stickyContextKey = Symbol('stickyContext') as InjectionKey<{
  box: MaybeRefOrGetter<HTMLElement | null>
}>
