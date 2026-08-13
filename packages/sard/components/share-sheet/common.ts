import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface ShareSheetbeforeClose {
  (type: 'close' | 'cancel' | 'select'): boolean | Promise<any>
}

export interface ShareSheetProps {
  title?: string
  description?: string
  cancel?: string
  showCancel?: boolean
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: ShareSheetbeforeClose
}

export const defaultShareSheetProps: DefaultProps<ShareSheetProps> = {
  overlayClosable: true,
}

export interface ShareSheetEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ShareSheetItemProps): void
}

export interface ShareSheetSlots {
  default?(props?: any): any
  title?(props?: any): any
  description?(props?: any): any
  cancel?(props?: any): any
}

export interface ShareSheetExpose {}

export interface ShareSheetItemProps {
  label?: string
  value?: any
  description?: string
  disabled?: boolean
}

export interface ShareSheetItemEmits {
  (e: 'click'): void
}

export interface ShareSheetItemSlots {
  default?(props?: Record<string, never>): any
  label?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
  icon?(props?: Record<string, never>): any
}

export interface ShareSheetRowProps {}

export const defaultShareSheetRowProps: DefaultProps<ShareSheetRowProps> = {}

export interface ShareSheetRowSlots {
  default?(props: Record<string, never>): any
}

export interface ShareSheetRowEmits {}

export interface ShareSheetRowExpose {}

export interface ShareSheetIconProps {
  background?: string
  color?: string
  url?: string
}

export interface ShareSheetIconSlots {
  default?(props: Record<string, never>): any
}
