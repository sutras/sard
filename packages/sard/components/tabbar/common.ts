import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface TabbarProps {
  modelValue?: number | string
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
  (e: 'update:modelValue', value: number | string): void
  (e: 'change', value: number | string): void
}

export interface TabbarItemProps {
  value?: string | number
  label?: string
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
  value: any
  select: (value: string | number) => void
}

export const tabbarContextKey = Symbol('tabbarContext') as InjectionKey<TabbarContext>
