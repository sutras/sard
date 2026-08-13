import { type DefaultProps } from '../config'

export interface SliderProps {
  range?: boolean
  modelValue?: number | number[]
  min?: number
  max?: number
  step?: number
  vertical?: boolean
  disabled?: boolean
  readonly?: boolean
  color?: string
  trackColor?: string
  trackSize?: string
  thumbColor?: string
  thumbSize?: string
  showValue?: boolean
  valuePosition?: 'top' | 'right' | 'bottom' | 'left'
  valueBackground?: string
  valueColor?: string
  showScale?: boolean
  scalePosition?: 'top' | 'right' | 'bottom' | 'left'
  validateEvent?: boolean
}

export const defaultSliderProps: DefaultProps<SliderProps> = {
  min: 0,
  max: 100,
  step: 1,
  validateEvent: true,
}

export interface SliderSlots {
  'start-thumb'?(props: { value: number }): any
  'end-thumb'?(props: { value: number }): any
}

export interface SliderEmits {
  (e: 'update:modelValue', value: number | number[]): void
  (e: 'input', value: number | number[]): void
  (e: 'change', value: number | number[]): void
  (e: 'drag-start', event: TouchEvent): void
  (e: 'drag-end', event: TouchEvent): void
}
