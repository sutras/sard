import { type HTMLAttributes, type InputTypeHTMLAttribute } from 'vue'
import { type DefaultProps } from '../config'

export type InputType = InputTypeHTMLAttribute | 'textarea' | 'digit'

export type InputAutoHeight = boolean | { minHeight?: number; maxHeight?: number }

export type InputTargetElement = HTMLInputElement | HTMLTextAreaElement

export type InputModelModifiers = {
  lazy?: true
  number?: true
  trim?: true
}

export interface InputProps {
  // custom
  modelValue?: string | number | null
  modelModifiers?: InputModelModifiers
  clearable?: boolean
  showClearOnlyFocus?: boolean
  showCount?: boolean
  inlaid?: boolean
  borderless?: boolean
  focused?: boolean
  autoHeight?: InputAutoHeight
  validateEvent?: boolean
  showEye?: boolean
  precision?: number
  formatter?: (value: string, trigger: 'input' | 'change') => string

  // native
  type?: InputType
  disabled?: boolean
  readonly?: boolean
  maxlength?: number | string
  min?: number
  max?: number

  // native direct pass
  rows?: string | number
  placeholder?: string
  autofocus?: boolean
  autocomplete?: string
  inputmode?: HTMLAttributes['inputmode']
  enterkeyhint?: HTMLAttributes['enterkeyhint']
  spellcheck?: HTMLAttributes['spellcheck']
  autocorrect?: string
  autocapitalize?: string
}

export const defaultInputProps: DefaultProps<InputProps> = {
  modelValue: '',
  modelModifiers: () => ({}),
  validateEvent: true,
  type: 'text',
}

export interface InputSlots {
  prepend?(props: Record<string, never>): any
  append?(props: Record<string, never>): any
}

export interface InputEmits {
  (e: 'input', value: string | number): void
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'clear'): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'compositionstart', event: CompositionEvent): void
  (e: 'compositionupdate', event: CompositionEvent): void
  (e: 'compositionend', event: CompositionEvent): void
}

export interface InputExpose {
  focus: () => void
  blur: () => void
}
