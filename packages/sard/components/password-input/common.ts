import { type DefaultProps } from '../config'

export interface PasswordInputProps {
  modelValue?: string
  length?: number
  type?: 'bordered' | 'underlined'
  gap?: number | string
  plainText?: boolean
  focused?: boolean
  customKeyboard?: boolean
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultPasswordInputProps: DefaultProps<PasswordInputProps> = {
  length: 6,
  type: 'bordered',
  validateEvent: true,
}

export interface PasswordInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'update:focused', focused: boolean): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
