import { type DefaultProps } from '../config'

export interface StepperProps {
  modelValue?: number | string | null
  min?: number
  max?: number
  valueOnClear?: number | 'min' | 'max'
  step?: number
  precision?: number
  inputType?: 'number' | 'digit'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  press?: boolean
  pressTime?: number
  interval?: number
  validateEvent?: boolean
  size?: 'small' | 'medium'
  variant?: 'solid' | 'outlined' | 'accent' | 'ghost'
}

export const defaultStepperProps: DefaultProps<StepperProps> = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  inputType: 'number',
  press: true,
  pressTime: 350,
  interval: 150,
  validateEvent: true,
  size: 'medium',
  variant: 'solid',
}

export interface StepperEmits {
  (e: 'update:modelValue', value: number | string | undefined): void
  (e: 'change', value: number | string | undefined): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
