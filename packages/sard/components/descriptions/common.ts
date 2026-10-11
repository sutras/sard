import { type InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export type DescriptionsAlign = 'start' | 'center' | 'end'

export interface DescriptionsProps {
  bordered?: boolean
  colon?: boolean
  columns?: number
  labelWidth?: string
  labelAlign?: DescriptionsAlign
}

export const defaultDescriptionsProps: DefaultProps<DescriptionsProps> = {
  columns: 1,
  colon: false,
}

export interface DescriptionsSlots {
  default?(props: Record<string, never>): any
}

export interface DescriptionsEmits {}

export interface DescriptionsItemMeta {
  colspan: () => number
  rowspan: () => number
}

export interface DescriptionsContext {
  bordered?: boolean
  colon?: boolean
  labelWidth?: string
  labelAlign?: DescriptionsAlign
  /** 注册一个描述项，返回注销函数 */
  registerItem: (meta: DescriptionsItemMeta) => () => void
  /** 获取某个描述项内容格的列跨度 */
  getContentSpan: (meta: DescriptionsItemMeta) => number | undefined
}

export const descriptionsContextKey = Symbol(
  'descriptionsContext',
) as InjectionKey<DescriptionsContext>

export interface DescriptionsItemProps {
  label?: string
  colspan?: number
  rowspan?: number
  labelAlign?: DescriptionsAlign
}

export const defaultDescriptionsItemProps: DefaultProps<DescriptionsItemProps> = {
  colspan: 1,
  rowspan: 1,
}

export interface DescriptionsItemSlots {
  default?(props: Record<string, never>): any
  label?(props: Record<string, never>): any
}

export interface DescriptionsItemEmits {}
