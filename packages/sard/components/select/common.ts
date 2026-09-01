import { type InjectionKey, type Ref } from 'vue'
import { type DefaultProps } from '../config'
import { type OptionKeys } from '../../use'

export interface SelectProps {
  modelValue?: any
  multiple?: boolean
  multipleLimit?: number
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string) => void
  filterValue?: string
  showToolbar?: boolean
  options?: any[]
  optionKeys?: OptionKeys
  valueKey?: string
  filterLoading?: boolean
}

export const defaultSelectProps: DefaultProps<SelectProps> = {
  multipleLimit: 0,
  options: () => [],
}

export interface SelectSlots {
  default?(): any
  bottom?(): any
  option?(props: { disabled: boolean; selected: boolean; label?: string | number; value: any }): any
  'option-label'?(props: {
    disabled: boolean
    selected: boolean
    label?: string | number
    value: any
  }): any
}

export interface SelectEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'select', value: any): void
  (e: 'update:filterValue', value: string): void
}

export interface SelectExpose {
  scrollTop: () => void
}

export interface SelectMember {
  el: HTMLElement | null
  isSelected: any
  value: any
  disabled: boolean
}

export interface SelectContext {
  innerValue: any
  toggle: (value: any) => void
  multiple: Ref<boolean>
  multipleLimit: Ref<number>
  addMember: (member: SelectMember) => void
  removeMember: (member: SelectMember) => void
  getEnabledValue: () => any[]
  members: SelectMember[]
}

export const selectContextKey = Symbol('selectContext') as InjectionKey<SelectContext>

export interface SelectOptionProps {
  label?: string | number
  value?: any
  disabled?: boolean
  plain?: boolean
}

export const defaultSelectOptionProps: DefaultProps<SelectOptionProps> = {}

export interface SelectOptionSlots {
  default?(props: {
    disabled: boolean
    selected: boolean
    label?: string | number
    value: any
  }): any
  label?(props: { disabled: boolean; selected: boolean; label?: string | number; value: any }): any
}

export interface SelectOptionEmits {
  (e: 'click', event: MouseEvent): void
}

export interface SelectOptionExpose {}

export interface SelectOptionGroupProps {
  label?: string | number
  disabled?: boolean
}

export const defaultSelectOptionGroupProps: DefaultProps<SelectOptionGroupProps> = {}

export interface SelectOptionGroupSlots {
  default?(props: Record<string, never>): any
}

export interface SelectOptionGroupEmits {}

export interface SelectOptionGroupExpose {}

export interface SelectOptionGroupContext {
  disabled?: boolean
}

export const selectOptionGroupContextKey = Symbol(
  'selectOptionGroupContext',
) as InjectionKey<SelectOptionGroupContext>
