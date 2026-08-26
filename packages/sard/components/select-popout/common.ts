import { type DefaultProps } from '../config'
import { defaultSelectProps, type SelectSlots, type SelectProps } from '../select/common'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface SelectPopoutProps extends FormPopoutProps, SelectProps {}

export const defaultSelectPopoutProps: DefaultProps<SelectPopoutProps> = {
  ...defaultSelectProps,
  showConfirm: true,
  validateEvent: true,
}

export interface SelectPopoutSlots extends SelectSlots {}

export interface SelectPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm', value: any): void
}

export interface SelectPopoutExpose {}
