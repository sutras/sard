import { type DefaultProps } from '../config'
import { type InputProps } from '../input/common'
export interface PopoutInputProps {
  modelValue?: string | number
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  loading?: boolean
  multiline?: boolean
  inputProps?: InputProps
  valueOnClear?: () => any
}

export const defaultPopoutInputProps: DefaultProps<PopoutInputProps> = {}

export interface PopoutInputEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}

export interface PopoutInputSlots {
  prepend?(): any
  append?(): any
  arrow?(): any
  default?(): any
}
