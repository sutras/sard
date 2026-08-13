import type {
  ClassValue,
  ComponentInternalInstance,
  ExtractPropTypes,
  ExtractPublicPropTypes,
  InjectionKey,
  PropType,
  StyleValue,
  WritableComputedRef,
} from 'vue'
import { type DefaultProps } from '../config'

export const pickerViewProps = {
  value: {
    type: Array as PropType<number[]>,
    default() {
      return []
    },
    validator(val: any) {
      return (
        Array.isArray(val) && val.filter((val) => typeof val === 'number').length === val.length
      )
    },
  },
  indicatorStyle: {
    type: null as unknown as PropType<StyleValue>,
  },
  indicatorClass: {
    type: null as unknown as PropType<ClassValue>,
  },
  maskStyle: {
    type: null as unknown as PropType<StyleValue>,
  },
  maskClass: {
    type: null as unknown as PropType<ClassValue>,
  },
}

export type PickerViewPrivateProps = ExtractPropTypes<typeof pickerViewProps>
export type PickerViewProps = ExtractPublicPropTypes<typeof pickerViewProps>

export const defaultPickerViewProps: DefaultProps<PickerViewProps> = {}

export interface PickerViewSlots {
  default?(): any
}

export interface PickerViewEmits {
  (e: 'update:value', value: number[]): void
  (e: 'change', value: number[]): void
}

export interface PickerViewExpose {}

export interface PickerViewColumnProps {}

export const defaultPickerViewColumnProps: DefaultProps<PickerViewColumnProps> = {}

export interface PickerViewColumnSlots {
  default?(): any
}

export interface PickerViewColumnEmits {}

export interface PickerViewColumnExpose {}

export interface PickerViewContext {
  maskStyle: any
  maskClass: any
  indicatorClass: any
  indicatorStyle: any
  height: number
  getColumnValue: (ins: ComponentInternalInstance) => WritableComputedRef<number>
}

export const pickerViewContextKey = Symbol('formContext') as InjectionKey<PickerViewContext>
