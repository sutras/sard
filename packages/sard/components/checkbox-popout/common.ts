import { type CheckboxGroupProps } from '../checkbox/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface CheckboxPopoutProps extends FormPopoutProps, CheckboxGroupProps {
  searchable?: boolean
  filterPlaceholder?: string
  showCheckAll?: boolean
  iconPosition?: 'left' | 'right'
}

export const defaultCheckboxPopoutProps: DefaultProps<CheckboxPopoutProps> = {
  validateEvent: true,
  iconPosition: 'left',
  options: () => [],
}

export interface CheckboxPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface CheckboxPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm', value: any): void
}

export interface CheckboxPopoutExpose {}
