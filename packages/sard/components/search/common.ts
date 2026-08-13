import { type DefaultProps } from '../config'

export interface SearchProps {
  modelValue?: string
  placeholder?: string
  shape?: 'round' | 'square'
  background?: string
  inputBackground?: string
  inputColor?: string
  readonly?: boolean
  disabled?: boolean
  align?: 'left' | 'center' | 'right'
  cancel?: string
  search?: string
  focus?: boolean
}

export const defaultSearchProps: DefaultProps<SearchProps> = {
  shape: 'square',
  focus: false,
}

export interface SearchSlots {
  prepend?(props: Record<string, never>): any
  append?(props: Record<string, never>): any
  'input-prepend'?(props: Record<string, never>): any
  'input-append'?(props: Record<string, never>): any
}

export interface SearchEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'cancel'): void
  (e: 'search', value: string): void
  (e: 'click', event: MouseEvent): void
  (e: 'clear'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export interface SearchExpose {
  focus: () => void
  blur: () => void
}
