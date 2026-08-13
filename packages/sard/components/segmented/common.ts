import { type DefaultProps } from '../config'
import { type OptionKeys } from '../../use'
import type { InjectionKey } from 'vue'

export type SegmentedOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean

export type SegmentedSize = 'small' | 'medium' | 'large'

export interface SegmentedProps {
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  size?: SegmentedSize
  direction?: 'horizontal' | 'vertical'
  shape?: 'square' | 'round'
  options?: SegmentedOption[]
  optionKeys?: OptionKeys
  validateEvent?: boolean
  ellipsis?: boolean
}

export const defaultSegmentedProps: DefaultProps<SegmentedProps> = {
  size: 'medium',
  shape: 'square',
  direction: 'horizontal',
  validateEvent: true,
  ellipsis: true,
}

export interface SegmentedSlots {
  default?(props: Record<string, never>): any
}

export interface SegmentedEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}

export interface SegmentedExpose {}

export interface SegmentedContext {
  disabled: SegmentedProps['disabled']
  readonly: SegmentedProps['readonly']
  size: SegmentedProps['size']
  shape: SegmentedProps['shape']
  ellipsis: boolean
  value: any
  toggle: (value: any) => void
}

export const segmentedContextKey = Symbol('segmentedContext') as InjectionKey<SegmentedContext>

export interface SegmentedItemProps {
  label?: string | number
  value?: string | number | boolean
  disabled?: boolean
  readonly?: boolean
}

export const defaultSegmentedItemProps: DefaultProps<SegmentedItemProps> = {}

export interface SegmentedItemSlots {
  default?(props: Record<string, never>): any
}

export interface SegmentedItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface SegmentedItemExpose {}
