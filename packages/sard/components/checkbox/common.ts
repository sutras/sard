import { type DefaultProps } from '../config'
import { type OptionKeys } from '../../use'
import type { InjectionKey } from 'vue'

export type IconType = 'square' | 'circle'

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  value?: any
  label?: string
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
  validateEvent?: boolean
}

export const defaultCheckboxProps: DefaultProps<CheckboxProps> = {
  validateEvent: true,
}

export interface CheckboxSlots {
  default?(props: Record<string, never>): any
  icon?(props: { checked: boolean }): any
}

export interface CheckboxEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:checked', checked: boolean): void
  (e: 'change', checked: boolean): void
}

export type CheckboxGroupOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean

export interface CheckboxGroupProps {
  modelValue?: any[]
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
  direction?: 'horizontal' | 'vertical'
  validateEvent?: boolean
  options?: CheckboxGroupOption[]
  optionKeys?: OptionKeys
}

export const defaultCheckboxGroupProps: DefaultProps<CheckboxGroupProps> = {
  direction: 'vertical',
  validateEvent: true,
}

export interface CheckboxGroupSlots {
  default?(props: { toggle: (value: any) => void; value: any[] }): any
}

export interface CheckboxGroupEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: any[]): void
  (e: 'change', value: any[]): void
}

export interface CheckboxContext {
  disabled: CheckboxGroupProps['disabled']
  readonly: CheckboxGroupProps['readonly']
  size: CheckboxGroupProps['size']
  type: CheckboxGroupProps['type']
  checkedColor: CheckboxGroupProps['checkedColor']
  value: any[]
  toggle: (value: any) => void
}

export const checkboxContextKey = Symbol('checkboxContext') as InjectionKey<CheckboxContext>
