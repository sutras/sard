import { type DefaultProps } from '../config'
import {
  type SelectPopoutEmits,
  type SelectPopoutExpose,
  type SelectPopoutProps,
  type SelectPopoutSlots,
  defaultSelectPopoutProps,
} from '../select-popout/common'
import { type PopoutInputSlots, type PopoutInputProps } from '../popout-input/common'

export interface SelectInputProps extends SelectPopoutProps, Omit<PopoutInputProps, 'modelValue'> {
  maxLabels?: number
  mapLabel?: Record<any, any>
}

export const defaultSelectInputProps: DefaultProps<SelectInputProps> = {
  ...defaultSelectPopoutProps,
  maxLabels: 10,
}

export interface SelectInputSlots extends SelectPopoutSlots, Omit<PopoutInputSlots, 'default'> {}

export interface SelectInputEmits extends SelectPopoutEmits {}

export interface SelectInputExpose extends SelectPopoutExpose {}
