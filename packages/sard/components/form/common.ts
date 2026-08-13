import { type InjectionKey, type Ref, inject } from 'vue'
import { type Validator, type Rule } from './Validator'
import { type DefaultProps } from '../config'

export interface FormRules {
  [key: PropertyKey]: Rule | Rule[] | FormRules
}

export type FieldName = string | number | (string | number)[]

export type ValidateState = '' | 'success' | 'error' | 'validating'

export type TriggerType = 'change' | 'blur' | ('change' | 'blur')[]

export interface FieldValidateError {
  name: FieldName
  value: any
  message: string
}

export interface FormProps {
  model?: Record<string, any>
  rules?: FormRules
  validateTrigger?: TriggerType
  validateOnRuleChange?: boolean

  direction?: 'horizontal' | 'vertical'
  labelWidth?: string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'start' | 'end'
  contentPosition?: 'start' | 'end'

  hideStar?: boolean
  showError?: boolean
  scrollToFirstError?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions

  disabled?: boolean
  readonly?: boolean
  card?: boolean
}

export const defaultFormProps: DefaultProps<FormProps> = {
  validateTrigger: 'change',
  validateOnRuleChange: true,
  direction: 'horizontal',
  labelAlign: 'start',
  labelValign: 'center',
  starPosition: 'start',
  contentPosition: 'start',
  showError: true,
  hideStar: false,
}

export interface FormSlots {
  default?(props: Record<string, never>): any
}

export interface FormExpose {
  validate: (nameList?: FieldName[]) => Promise<void>
  reset: (nameList?: FieldName[]) => Promise<void>
  clearValidate: (nameList?: FieldName[]) => void
  scrollToField: (name: FieldName) => void
}

export interface FormItemProps {
  direction?: 'horizontal' | 'vertical'
  labelWidth?: string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'start' | 'end'
  label?: string
  hideStar?: boolean
  contentPosition?: 'start' | 'end'

  required?: boolean | undefined
  name?: FieldName
  rules?: Rule | Rule[]
  validateTrigger?: TriggerType
  error?: string
  showError?: boolean
  inlaid?: boolean
}

export const defaultFormItemProps: DefaultProps<FormItemProps> = {
  showError: undefined,
  hideStar: undefined,
  required: undefined,
}

export interface FormItemSlots {
  default?(props: Record<string, never>): any
  label?(props: Record<string, never>): any
  validate?(props: { state: ValidateState }): any
  error?(props: { message: string; showError: boolean }): any
}

export interface FormItemExpose {
  validate: (trigger?: string | string[]) => Promise<void>
  reset: () => Promise<void>
  clearValidate: () => void
  scrollToField: () => void
  validateMessage: Ref<string>
  validateState: Ref<ValidateState>
}

export interface FormContext {
  model: FormProps['model']
  rules: FormProps['rules']
  validateTrigger: FormProps['validateTrigger']
  direction: FormProps['direction']
  labelWidth: FormProps['labelWidth']
  labelAlign: FormProps['labelAlign']
  labelValign: FormProps['labelValign']
  starPosition: FormProps['starPosition']
  contentPosition: FormProps['contentPosition']
  hideStar: FormProps['hideStar']
  showError: FormProps['showError']
  scrollIntoViewOptions: FormProps['scrollIntoViewOptions']
  disabled: FormProps['disabled']
  readonly: FormProps['readonly']
  addField: (context: FormItemContext) => void
  removeField: (context: FormItemContext) => void
  validator: Validator
}

export interface FormItemContext {
  name: FormItemProps['name']
  validateMessage: string
  validateState: ValidateState
  validate: (trigger?: string | string[]) => Promise<void>
  reset: () => Promise<void>
  clearValidate: () => void
  scrollToField: () => void
  onBlur: () => void
  onChange: () => void
}

export const formContextKey = Symbol('formContext') as InjectionKey<FormContext>

export const formItemContextKey = Symbol('formItemContext') as InjectionKey<FormItemContext>

export function useFormContext() {
  return inject(formContextKey, null)
}

export function useFormItemContext() {
  return inject(formItemContextKey, null)
}
