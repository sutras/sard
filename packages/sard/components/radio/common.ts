import { type DefaultProps } from '../config'
import { type OptionKeys } from '../../use'
import type { InjectionKey } from 'vue'

export type IconType = 'circle' | 'record'

export interface RadioProps {
  checked?: boolean
  value?: any
  label?: string
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
}

export interface RadioSlots {
  default?(props: Record<string, never>): any
  icon?(props: { checked: boolean }): any
}

export interface RadioEmits {
  (e: 'click', event: MouseEvent): void
}

export type RadioGroupOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean

export interface RadioGroupProps {
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
  direction?: 'horizontal' | 'vertical'
  validateEvent?: boolean
  options?: RadioGroupOption[]
  optionKeys?: OptionKeys
}

export const defaultRadioGroupProps: DefaultProps<RadioGroupProps> = {
  direction: 'vertical',
  validateEvent: true,
}

export interface RadioGroupSlots {
  default?(props: { toggle: (value: any) => void; value: any }): any
}

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}

export interface RadioContext {
  disabled: RadioProps['disabled']
  readonly: RadioProps['readonly']
  size: RadioProps['size']
  type: RadioProps['type']
  checkedColor: RadioProps['checkedColor']
  value: any
  toggle: (value: any) => void
}

export const radioContextKey = Symbol('radioContext') as InjectionKey<RadioContext>
