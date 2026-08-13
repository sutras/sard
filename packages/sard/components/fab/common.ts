import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface FabProps {
  visible?: boolean
  top?: string
  right?: string
  bottom?: string
  left?: string
  color?: string
  background?: string
  hideName?: boolean
  overlayClosable?: boolean

  draggable?: boolean
  axis?: 'x' | 'y' | 'both' | 'none'
  magnet?: 'x' | 'y'
  marginX?: number
  marginY?: number
  offset?: { x: number; y: number }
}

export const defaultFabProps: DefaultProps<FabProps> = {
  overlayClosable: false,
  hideName: false,
  draggable: false,
  axis: 'y',
  marginX: 24,
  marginY: 24,
}

export interface FabSlots {
  default?(): any
  entry?(props: { visible: boolean }): any
}

export interface FabEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:visible', visible: boolean): void
  (e: 'update:offset', offset: { x: number; y: number }): void
}

export interface FabContext {
  hideName?: boolean
  visible?: boolean
  isLeft?: boolean
  onItemClick: () => void
}

export const fabContextKey = Symbol('fabContext') as InjectionKey<FabContext>

export interface FabItemProps {
  name?: string
  color?: string
  background?: string
  isEntry?: boolean
}

export const defaultFabItemProps: DefaultProps<FabItemProps> = {}

export interface FabItemSlots {
  default?(): any
  name?(): any
}

export interface FabItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface FabItemExpose {}
