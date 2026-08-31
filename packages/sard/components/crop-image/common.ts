import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface CropImageProps {
  visible?: boolean
  url?: string
  cropScale?: string
  type?: string
  quality?: number
  success?: (dataURL: string, info: { width: number; height: number }) => void
  fail?: (err: any) => void
  complete?: () => void
  cancel?: () => void
  beforeCrop?: (width: number, height: number) => number
  cancelText?: string
  confirmText?: string
  closeOnBackPress?: boolean
}

export const defaultCropImageProps: DefaultProps<CropImageProps> = {
  cropScale: '1:1',
  type: 'image/png',
  quality: 0.92,
  closeOnBackPress: true,
}

export interface CropImageSlots {
  default?(props: Record<string, never>): any
}

export interface CropImageEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface CropImageExpose {}
