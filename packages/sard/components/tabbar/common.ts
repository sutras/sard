import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface TabbarProps {
  current?: number | string
  color?: string
  activeColor?: string
  bordered?: boolean
  fixed?: boolean
  safeAreaInsetBottom?: boolean
}

export const defaultTabbarProps: DefaultProps<TabbarProps> = {
  bordered: true,
}

export interface TabbarSlots {
  default?(props: Record<string, never>): any
}

export interface TabbarEmits {
  (e: 'update:current', current: number | string): void
  (e: 'change', current: number | string): void
}

export interface TabbarItemProps {
  name?: string | number
  text?: string
}

export interface TabbarItemSlots {
  default?(props: Record<string, never>): any
  icon?(props: { active: boolean }): any
}

export interface TabbarItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface TabbarContext {
  color: TabbarProps['color']
  activeColor: TabbarProps['activeColor']
  current: any
  select: (name: string | number) => void
}

export const tabbarContextKey = Symbol('tabbarContext') as InjectionKey<TabbarContext>
