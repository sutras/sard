import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface CompactProps {
  block?: boolean
  direction?: 'horizontal' | 'vertical'
}

export const defaultCompactProps: DefaultProps<CompactProps> = {
  direction: 'horizontal',
}

export interface CompactSlots {
  default?(props: Record<string, never>): any
}

export interface CompactEmits {}

export interface CompactExpose {}

export interface CompactContext {
  items: any[]
  block: boolean
  direction: 'horizontal' | 'vertical'
  addItem: (item: any) => void
  removeItem: (item: any) => void
}

export const compactContextKey = Symbol('compactContext') as InjectionKey<CompactContext>
