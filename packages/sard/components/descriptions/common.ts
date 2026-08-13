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

export interface DescriptionsContext {
  bordered?: boolean
  colon?: boolean
  labelWidth?: string
  labelAlign?: DescriptionsAlign
}

export const descriptionsContextKey = Symbol(
  'descriptionsContext',
) as InjectionKey<DescriptionsContext>

export interface DescriptionsItemProps {
  label?: string
  colspan?: number
  rowspan?: number
  labelWidth?: string
  labelAlign?: DescriptionsAlign
  /** @internal set by Descriptions for last item in incomplete rows */
  contentColspan?: number
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
