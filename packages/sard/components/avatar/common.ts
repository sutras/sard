import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface AvatarProps {
  shape?: 'circle' | 'square'
  size?: string
  iconSize?: string
  background?: string
  color?: string
  src?: string
  index?: number
}

export const defaultAvatarProps: DefaultProps<AvatarProps> = {
  shape: 'circle',
}

export interface AvatarSlots {
  default?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
}

export interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
}

export interface AvatarGroupProps {
  max: number
  total: number
  coverage?: number
  showRemain?: boolean
  remainText?: string | number
}

export const defaultAvatarGroupProps: DefaultProps<AvatarGroupProps> = {
  coverage: 0.5,
  showRemain: true,
}

export interface AvatarGroupSlots {
  default?(props: Record<string, never>): any
}

export interface AvatarGroupEmits {
  (e: 'remain-click', event: any): void
}

export interface AvatarGroupExpose {}

export interface AvatarGroupContext {
  total: number
  max: number
  showRemain: boolean
  remainText?: string | number
  coverage: number
  onRemainClick: (event: MouseEvent) => void
}

export const avatarGroupContextKey = Symbol(
  'avatarGroupContext',
) as InjectionKey<AvatarGroupContext>
