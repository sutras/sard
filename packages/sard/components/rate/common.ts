import { type DefaultProps } from '../config'

export interface RateProps {
  modelValue?: number
  allowHalf?: boolean
  clearable?: boolean
  count?: number
  size?: string
  gap?: string
  text?: string
  voidText?: string
  color?: string
  voidColor?: string
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultRateProps: DefaultProps<RateProps> = {
  count: 5,
  validateEvent: true,
}

export interface RateSlots {
  'void-star'?(): any
  star?(): any
}

export interface RateEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}
