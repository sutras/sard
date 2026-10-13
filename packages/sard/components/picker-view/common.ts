import type {
  ClassValue,
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

export interface PickerViewColumnProps {
  /**
   * 选项数量。**推荐由知道数据的那一层传入**（如 Picker 会传 `column.length`）：不传时
   * 回落到观察 DOM 子节点数，而整列重建时 DOM 会有中间态（少到 1 个），会被按列数夹取
   * 的逻辑误判成 0，导致整列跳回第一行。
   */
  itemCount?: number
}

export const defaultPickerViewColumnProps: DefaultProps<PickerViewColumnProps> = {}

export interface PickerViewColumnSlots {
  default?(): any
}

export interface PickerViewColumnEmits {}

export interface PickerViewColumnExpose {}

/**
 * 列的身份句柄：由 `PickerViewColumn` 在 setup 里自建一个普通对象，交给 PickerView
 * 按登记顺序定位「当前位于第几列」。
 *
 * ⚠️ 不要用组件实例（`getCurrentInstance()`）代替它：vapor 渲染子组件期间，它返回的是
 * **发起本次渲染的组件**（实测三列 PickerViewColumn 都拿到页面组件的实例），据此定位会
 * 把所有列都算成第 0 列，导致所有列共用同一个 `innerValue[0]`：滚动第一列后取值/写值
 * 互相串列，级联 Picker 会因此把值夹取到 0（回到第一行）。
 */
export interface PickerViewColumnHandle {
  readonly __pickerViewColumn: true
}

export interface PickerViewContext {
  maskStyle: any
  maskClass: any
  indicatorClass: any
  indicatorStyle: any
  registerColumn: (handle: PickerViewColumnHandle) => void
  unregisterColumn: (handle: PickerViewColumnHandle) => void
  getColumnValue: (handle: PickerViewColumnHandle) => WritableComputedRef<number>
}

export const pickerViewContextKey = Symbol('formContext') as InjectionKey<PickerViewContext>
