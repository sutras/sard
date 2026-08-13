import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface IndexesProps {
  current?: number | string
}

export const defaultIndexesProps: DefaultProps<IndexesProps> = {}

export interface IndexesSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesEmits {
  (e: 'update:current', name: number | string): void
  (e: 'change', name: number | string): void
}

export interface IndexesExpose {
  scrollTo: (name: string | number) => void
  update: () => void
}

export interface IndexesAnchorProps {
  name?: string | number
}

export interface IndexesAnchorSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesNavProps {
  anchors: (string | number)[]
  current?: string | number
}

export interface IndexesNavSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesNavEmits {
  (e: 'update:current', name: string | number): void
  (e: 'change', name: string | number): void
}

export interface IndexesContext {
  register: (name: string | number, getRect: () => DOMRect) => void
  unregister: (name: string | number) => void
}

export const indexesContextKey = Symbol('indexesContext') as InjectionKey<IndexesContext>
