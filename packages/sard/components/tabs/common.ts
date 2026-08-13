import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface TabsProps {
  modelValue?: unknown
  options?: TabProps[]
  type?: 'line' | 'pill' | 'card'
  scrollable?: boolean
}

export const defaultTabsProps: DefaultProps<TabsProps> = {
  type: 'line',
}

export interface TabsSlots {
  default?(): any
  line?(): any
}

export interface TabsEmits {
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown): void
}

export interface TabProps {
  label?: string
  value: unknown
  disabled?: boolean
}

export interface TabSlots {
  default?(): any
}

export interface TabEmits {
  (e: 'click', event: MouseEvent): void
}

export interface TabMember {
  el: HTMLElement
  value: unknown
}

export interface TabContext {
  value: unknown
  select: (member: TabMember, initial?: boolean) => void
  addMember: (member: TabMember) => void
  removeMember: (member: TabMember) => void
}

export const tabContextKey = Symbol('tabContext') as InjectionKey<TabContext>
