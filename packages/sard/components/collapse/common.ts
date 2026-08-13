import type { ClassValue, StyleValue } from 'vue'

export interface CollapseProps {
  contentClass?: ClassValue
  contentStyle?: StyleValue
  visible?: boolean
  destroyOnClose?: boolean
  lazy?: boolean
}

export interface CollapseSlots {
  default?(props: Record<string, never>): any
}
