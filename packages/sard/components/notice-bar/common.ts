import { type DefaultProps } from '../config'

export interface NoticeBarProps {
  color?: string
  background?: string
  hideLeftIcon?: boolean
  speed?: number
  scrollable?: 'auto' | 'never' | 'always'
  wrap?: boolean
  closable?: boolean
  linkable?: boolean
  visible?: boolean
  vertical?: boolean
}

export const defaultNoticeBarProps: DefaultProps<NoticeBarProps> = {
  speed: 50,
  scrollable: 'auto',
  visible: true,
}

export interface NoticeBarSlots {
  default?(props: Record<string, never>): any
  'left-icon'?(props: Record<string, never>): any
  'right-icon'?(props: Record<string, never>): any
}

export interface NoticeBarEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'close'): void
}

export interface NoticeBarExpose {}
