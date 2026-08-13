import { type DefaultProps } from '../config'

export interface SwitchProps {
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  size?: string
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  beforeUpdate?: (value: any) => Promise<any>
  validateEvent?: boolean
  checkedText?: string
  uncheckedText?: string
}

export const defaultSwitchProps: DefaultProps<SwitchProps> = {
  checkedValue: true,
  uncheckedValue: false,
  validateEvent: true,
}

export interface SwitchSlots {
  'checked-text'?(props: Record<string, never>): any
  'unchecked-text'?(props: Record<string, never>): any
}

export interface SwitchEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'update:loading', loading: boolean): void
}
