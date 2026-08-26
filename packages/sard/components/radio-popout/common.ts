import { type RadioGroupProps } from '../radio/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface RadioPopoutProps extends FormPopoutProps, RadioGroupProps {
  searchable?: boolean
  filterPlaceholder?: string
  iconPosition?: 'left' | 'right'
}

export const defaultRadioPopoutProps: DefaultProps<RadioPopoutProps> = {
  validateEvent: true,
  type: 'circle',
  iconPosition: 'left',
  options: () => [],
}

export interface RadioPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface RadioPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm', value: any): void
}

export interface RadioPopoutExpose {}
