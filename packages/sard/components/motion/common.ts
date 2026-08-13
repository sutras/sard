import type { DefaultProps } from '../config'

export type MotionName =
  | 'fade'
  | 'zoom'
  | 'wide-zoom'
  | 'slide-top'
  | 'slide-right'
  | 'slide-bottom'
  | 'slide-left'

export type MotionType = 'transition' | 'animation'

export interface MotionProps {
  name?: MotionName
  type?: MotionType
  disalbed?: boolean
}

export const defaultMotionProps: DefaultProps<MotionProps> = {
  name: 'fade',
  type: 'transition',
}

export interface MotionSlots {
  default?(): any
}

export type MotionHookName =
  | 'before-enter'
  | 'enter'
  | 'after-enter'
  | 'enter-cancelled'
  | 'before-leave'
  | 'leave'
  | 'after-leave'
  | 'leave-cancelled'

export interface MotionEmits {
  (e: 'before-enter', el: Element): void
  (e: 'enter', el: Element): void
  (e: 'after-enter', el: Element): void
  (e: 'enter-cancelled', el: Element): void
  (e: 'before-leave', el: Element): void
  (e: 'leave', el: Element): void
  (e: 'after-leave', el: Element): void
  (e: 'leave-cancelled', el: Element): void
  (e: 'visible-hook', name: MotionHookName, el: Element): void
}
