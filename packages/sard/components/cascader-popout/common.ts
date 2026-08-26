import { type CascaderOption, type CascaderProps } from '../cascader/common'
import { type DefaultProps } from '../config'
import { type FormPopoutProps } from '../popout/useFormPopout'
import type { MotionEmits } from '../motion'

export interface CascaderPopoutProps extends FormPopoutProps, CascaderProps {}

export const defaultCascaderPopoutProps: DefaultProps<CascaderPopoutProps> = {
  showConfirm: true,
  validateEvent: true,
}

export interface CascaderPopoutSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', value: any, selectedOptions: CascaderOption[]): void
  (e: 'change', value: any, selectedOptions: CascaderOption[]): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
  (e: 'confirm', value: any, selectedOptions: CascaderOption[]): void
}

export interface CascaderPopoutExpose {}
