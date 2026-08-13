import type { InjectionKey } from 'vue'
import { type ScrollIntoViewOptions } from '../../utils'

export interface SidebarProps {
  modelValue?: string | number
  round?: boolean
  line?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions
}

export interface SidebarSlots {
  default?(props: Record<string, never>): any
}

export interface SidebarEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}

export interface SidebarExpose {}

export interface SidebarMember {
  el: HTMLElement | null
  name: string | number
}

export interface SidebarContext {
  current: any
  select: (member: SidebarMember) => void
  addMember: (member: SidebarMember) => void
  removeMember: (member: SidebarMember) => void
  round?: boolean
  line?: boolean
}

export const sidebarContextKey = Symbol('sidebarContext') as InjectionKey<SidebarContext>

export interface SidebarItemProps {
  title?: string
  name: string | number
  disabled?: boolean
}

export interface SidebarItemSlots {
  default?(props: Record<string, never>): any
}

export interface SidebarItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface SidebarItemExpose {}
