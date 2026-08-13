import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'
import type { MotionEmits } from '../motion'

export interface PreviewImageProps {
  visible?: boolean
  current?: number
  urls?: string[]
}

export const defaultPreviewImageProps: DefaultProps<PreviewImageProps> = {
  current: 0,
  urls: () => [],
}

export interface PreviewImageSlots {
  default?(props: Record<string, never>): any
}

export interface PreviewImageEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:current', current: number): void
}

export interface PreviewImageExpose {}

export interface PreviewImageItemProps {
  url: string
}

export interface PreviewImageContext {
  visibleSwitching: boolean
  immersive: boolean
  sceneType: 'dragPinch' | 'swipe' | null
  close: () => void
}

export const previewImageContextKey = Symbol(
  'previewImageContext',
) as InjectionKey<PreviewImageContext>
