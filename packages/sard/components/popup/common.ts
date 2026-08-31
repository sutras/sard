import {
  inject,
  ref,
  provide,
  watch,
  reactive,
  type InjectionKey,
  type ClassValue,
  type StyleValue,
} from 'vue'
import { type DefaultProps } from '../config'
import type { MotionEmits, MotionHookName, MotionName } from '../motion/common'

export type PopupEffect =
  | 'slide-top'
  | 'slide-right'
  | 'slide-bottom'
  | 'slide-left'
  | 'zoom'
  | 'fade'
  | 'full-fade'

export interface PopupProps {
  visible?: boolean
  effect?: PopupEffect
  overlay?: boolean
  overlayClass?: ClassValue
  overlayStyle?: StyleValue
  background?: string
  transparent?: boolean
  overlayClosable?: boolean
  lockScroll?: boolean
  destroyOnClose?: boolean
  lazy?: boolean
  closeOnBackPress?: boolean
}

export const mapEffectMotion: Record<PopupEffect, MotionName> = {
  'slide-top': 'slide-top',
  'slide-right': 'slide-right',
  'slide-bottom': 'slide-bottom',
  'slide-left': 'slide-left',
  zoom: 'zoom',
  fade: 'fade',
  'full-fade': 'fade',
}

export const defaultPopupProps: DefaultProps<PopupProps> = {
  effect: 'fade',
  overlay: true,
  overlayClosable: true,
  lockScroll: true,
  lazy: true,
}

export interface PopupSlots {
  default?(props: Record<string, never>): any
}

export interface TransitionHookCallbacks {
  onVisibleHook?: (name: MotionHookName) => void
  onBeforeEnter?: () => void
  onEnter?: () => void
  onAfterEnter?: () => void
  onEnterCancelled?: () => void
  onBeforeLeave?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
  onLeaveCancelled?: () => void
}

export interface PopupEmits extends MotionEmits {
  (e: 'overlay-click', event: any): void
  (e: 'back-press'): void
  (e: 'update:visible', visible: boolean): void
}

export interface PopupExpose {}

export interface PopupContext {
  visibleState: MotionHookName | undefined
}

export const popupContextKey = Symbol('popupContext') as InjectionKey<PopupContext>

export function usePopupVisibleHookProvide() {
  const visibleState = ref<MotionHookName>()

  provide(
    popupContextKey,
    reactive({
      visibleState,
    }),
  )

  function callVisibleHook(name: MotionHookName) {
    visibleState.value = name
  }

  return callVisibleHook
}

export function usePopupEnter(callback: () => void) {
  const context = inject(popupContextKey, null)
  if (context) {
    watch(
      () => context.visibleState,
      () => {
        if (context.visibleState === 'enter') {
          callback?.()
        }
      },
    )
  }

  return {
    context,
  }
}

export function useInPopup() {
  return !!inject(popupContextKey, null)
}
