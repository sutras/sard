import { type InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsItem {
  status?: StepsStatus
  name?: string
  description?: string
}

export interface StepsProps {
  current?: number
  itemList?: StepsItem[]
  center?: boolean
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  status?: StepsStatus
}

export const defaultStepsProps: DefaultProps<StepsProps> = {
  current: 0,
  center: false,
  itemList: () => [],
  direction: 'horizontal',
}

export interface StepsSlots {
  default?(props: Record<string, never>): any
}

export interface StepsContext {
  current: number
  center?: boolean
  direction?: StepsProps['direction']
  status?: StepsStatus
  reverse?: boolean
}

export const stepsContextKey = Symbol('stepsContext') as InjectionKey<StepsContext>

export interface StepProps {
  status?: StepsStatus
  name?: string
  description?: string
  index: number
}

export interface StepSlots {
  default?(props: { status: StepsStatus }): any
  icon?(props: { status: StepsStatus }): any
}

export interface StepEmits {}

export interface StepExpose {}
