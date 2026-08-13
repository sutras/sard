import { type DefaultProps } from '../config'
import { type KeyboardProps, type KeyboardPlateMode, type KeyBoardExpose } from '../keyboard/common'
import type { MotionEmits } from '../motion'

export interface KeyboardPopoutProps extends KeyboardProps {
  visible?: boolean
  title?: string
  transparent?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  showShadow?: boolean
}

export const defaultKeyboardPopoutProps: DefaultProps<KeyboardPopoutProps> = {
  showConfirm: true,
  showCancel: true,
}

export interface KeyboardPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface KeyboardPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'input', key: string): void
  (e: 'delete'): void
  (e: 'toggle', mode: KeyboardPlateMode): void
  (e: 'update:mode', mode: KeyboardPlateMode): void
}

export interface KeyboardPopoutExpose extends KeyBoardExpose {}
