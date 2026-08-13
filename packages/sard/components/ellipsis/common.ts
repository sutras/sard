import { type DefaultProps } from '../config'

export type EllipsisPosition = 'start' | 'middle' | 'end'

export interface EllipsisProps {
  content?: string
  rows?: number
  position?: EllipsisPosition
  dots?: string
  expandText?: string
  collapseText?: string
  expanded?: boolean
}

export const defaultEllipsisProps: DefaultProps<EllipsisProps> = {
  content: '',
  rows: 1,
  position: 'end',
  dots: '...',
}

export interface EllipsisSlots {}

export interface EllipsisEmits {
  (e: 'update:expanded', expanded: boolean): void
  (e: 'change', expanded: boolean): void
}

export interface EllipsisExpose {}
