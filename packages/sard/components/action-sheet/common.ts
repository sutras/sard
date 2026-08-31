import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'
import { type UseActionSheetReturn } from './context'

export interface ActionSheetBeforeClose {
  (
    type: 'close' | 'cancel',
    loading: {
      readonly cancel: boolean
      readonly select: boolean
      readonly close: boolean
    },
  ): any
  (
    type: 'select',
    loading: {
      readonly cancel: boolean
      readonly select: boolean
      readonly close: boolean
    },
    item: ActionSheetItemProps,
    index: number,
  ): any
}

export interface ActionSheetProps {
  description?: string
  itemList?: ActionSheetItemProps[]
  cancel?: string
  showCancel?: boolean
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: ActionSheetBeforeClose
  internalContext?: UseActionSheetReturn
  closeOnBackPress?: boolean
}

export const defaultActionSheetProps: DefaultProps<ActionSheetProps> = {
  overlayClosable: true,
  closeOnBackPress: true,
}

export interface ActionSheetEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ActionSheetItemProps, index: number): void
}

export interface ActionSheetSlots {
  default?(props?: any): any
  description?(props?: any): any
  cancel?(props?: any): any
}

export interface ActionSheetExpose {}

export interface ActionSheetItemProps {
  label?: string
  value?: any
  description?: string
  color?: string
  loading?: boolean
  disabled?: boolean
}

export interface ActionSheetItemEmits {
  (e: 'click'): void
}

export interface ActionSheetItemSlots {
  default?(props?: Record<string, never>): any
  label?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
}
