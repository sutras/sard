import { type InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface WaterfallProps {
  columns?: number
  columnGap?: number
  rowGap?: number
}

export const defaultWaterfallProps: DefaultProps<WaterfallProps> = {
  columns: 2,
  columnGap: 16,
  rowGap: 16,
}

export interface WaterfallSlots {
  default?(props: Record<string, never>): any
}

export interface WaterfallEmits {
  (e: 'load'): void
  (e: 'loadstart'): void
}

export interface WaterfallExpose {
  reflow: () => void
  onLoad: (handler: () => void) => void
}

export interface WaterfallContext {
  columnWidth: number
  addMember: (member: WaterfallMember) => void
  removeMember: (member: WaterfallMember) => void
  onItemLoad: () => void
}

export const waterfallContextKey = Symbol('waterfallContext') as InjectionKey<WaterfallContext>

export interface WaterfallItemProps {}

export interface WaterfallItemSlots {
  default?(props: { onLoad: () => void; columnWidth: number }): any
}

export interface WaterfallItemEmits {}

export interface WaterfallItemExpose {}

export interface WaterfallMember {
  height: number
  loaded: boolean
  visible: boolean
  top: number
  left: number
  beforeReflow: () => void
}

export interface WaterfallLoadProps {
  maxWait?: number
  width?: number
  height?: number
}

export interface WaterfallLoadSlots {
  default?(props: { onLoad: (event: Event) => void; overtime: boolean }): any
}

export interface WaterfallLoadEmits {
  (e: 'load'): void
}

export interface WaterfallLoadExpose {}
