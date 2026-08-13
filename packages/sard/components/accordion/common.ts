import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface AccordionProps {
  modelValue?: (string | number)[] | string | number
  multiple?: boolean
  hideBorder?: boolean
}

export const defaultAccordionProps: DefaultProps<AccordionProps> = {}

export interface AccordionEmits {
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
}

export interface AccordionSlots {
  default?(props: Record<string, never>): any
}

export interface AccordionContext {
  value: any
  multiple: AccordionProps['multiple']
  toggle: (name: string | number) => void
  hideBorder?: boolean
}

export const accordionContextKey = Symbol('accordionContext') as InjectionKey<AccordionContext>

export interface AccordionItemProps {
  title?: string
  extra?: string
  name?: string | number
  disabled?: boolean
}

export interface AccordionItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface AccordionItemSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
  arrow?(props: { visible: boolean }): any
}
