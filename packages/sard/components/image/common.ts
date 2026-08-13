import { type DefaultProps } from '../config'

export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export interface ImageProps {
  src?: string
  mode?: ImageMode
  loading?: 'eager' | 'lazy'

  width?: string
  height?: string
  shape?: 'circle' | 'square'
  radius?: string
  showLoading?: boolean
  showError?: boolean
  background?: string
  fade?: boolean
  customLoad?: (callback: (event: any) => void) => any
}

export const defaultImageProps: DefaultProps<ImageProps> = {
  mode: 'aspectFill',
  loading: 'eager',
  shape: 'square',
  fade: true,
  showLoading: true,
  showError: true,
}

export interface ImageSlots {
  loading?(props: Record<string, never>): any
  error?(props: Record<string, never>): any
}

export interface ImageEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}

export interface ImageExpose {}

export const FIX_MODES = {
  widthFix: true,
  heightFix: true,
}

export const IMAGE_MODES = {
  aspectFit: ['center', 'contain'],
  aspectFill: ['center', 'cover'],
  scaleToFill: ['center', '100% 100%'],
  widthFix: [undefined, '100% 100%'],
  heightFix: [undefined, '100% 100%'],
  top: ['center top', 'auto'],
  bottom: ['center bottom', 'auto'],
  left: ['left center', 'auto'],
  right: ['right center', 'auto'],
  center: ['center', 'auto'],
  'top left': ['left top', 'auto'],
  'top right': ['right top', 'auto'],
  'bottom left': ['left bottom', 'auto'],
  'bottom right': ['right bottom', 'auto'],
}
