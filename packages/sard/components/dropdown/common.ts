import { type InjectionKey } from 'vue'
import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface DropdownProps {
  direction?: 'down' | 'up'
  disabled?: boolean
  awayClosable?: boolean
  overlayClosable?: boolean
  togglable?: boolean
  valueOnClear?: () => any
  separator?: 'shadow' | 'line' | 'none'
}

export const defaultDropdownProps: DefaultProps<DropdownProps> = {
  direction: 'down',
  disabled: false,
  awayClosable: true,
  overlayClosable: true,
  separator: 'line',
}

export interface DropdownSlots {
  default?(props: Record<string, never>): any
}

export interface DropdownOption {
  label?: string
  value?: any
}

export type DropdownCloseType = 'overlay' | 'away' | 'other-button' | 'option' | 'button'

export type DropdownBeforeClose = (type: DropdownCloseType) => any

export type DropdownBeforeOpen = () => any

export interface DropdownItemProps {
  title?: string
  label?: string
  options?: DropdownOption[]
  disabled?: boolean
  modelValue?: any
  visible?: boolean
  placeholder?: string
  togglable?: boolean
  valueOnClear?: () => any
  beforeClose?: DropdownBeforeClose
  beforeOpen?: DropdownBeforeOpen
}

export const defaultDropdownItemProps: DefaultProps<DropdownItemProps> = {
  options: () => [],
}

export interface DropdownItemSlots {
  default?(props: Record<string, never>): any
}

export interface DropdownItemEmits extends MotionEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'update:visible', visible: boolean): void
}

export interface DropdownItemInstacne {
  hide: () => void
  visible: boolean
}

export interface DropdownContext {
  direction: DropdownProps['direction']
  disabled: DropdownProps['disabled']
  awayClosable: DropdownProps['awayClosable']
  overlayClosable: DropdownProps['overlayClosable']
  togglable: DropdownProps['togglable']
  valueOnClear: DropdownProps['valueOnClear']
  hideOthers: (instance: DropdownItemInstacne) => void
  register: (instance: DropdownItemInstacne) => void
  unregister: (instance: DropdownItemInstacne) => void
}

export const dropdownContextKey = Symbol('dropdownContext') as InjectionKey<DropdownContext>

export const defaultValueOnClear = () => undefined
