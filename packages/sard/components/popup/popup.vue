<template>
  <teleport to="body">
    <Overlay
      v-if="overlay"
      :visible="visible"
      :z-index="zIndex"
      :background="background"
      :transparent="transparent"
      :style="overlayStyle"
      :class="overlayClass"
      @click="onOverlayClick"
    />
    <Motion :name="motionName" @visible-hook="onVisibleHook">
      <div v-show="visible" v-bind="$attrs" :class="popupClass" :style="popupStyle">
        <slot v-if="rendered"></slot>
      </div>
    </Motion>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createBem } from '../../utils'
import { useLockScroll, useZIndex } from '../../use'
import Overlay from '../overlay/overlay.vue'
import {
  type PopupProps,
  type PopupSlots,
  type PopupEmits,
  defaultPopupProps,
  usePopupVisibleHookProvide,
  mapEffectMotion,
} from './common'
import Motion from '../motion/motion.vue'
import type { MotionHookName } from '../motion/common'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopupProps>(), defaultPopupProps)

defineSlots<PopupSlots>()

const emit = defineEmits<PopupEmits>()

const bem = createBem('popup')

const motionName = computed(() => {
  return mapEffectMotion[props.effect]
})

const [zIndex, increaseZIndex] = useZIndex()

const rendered = ref(props.visible || !props.lazy)

const callVisibleHook = usePopupVisibleHookProvide()

const onVisibleHook = (name: MotionHookName, el: Element) => {
  if (name === 'before-enter') {
    increaseZIndex()
    rendered.value = true
  } else if (name === 'after-leave') {
    if (props.destroyOnClose) {
      rendered.value = false
    }
  }

  callVisibleHook(name)
  emit('visible-hook', name, el)
  emit(name as any, el)
}

const onOverlayClick = (event: MouseEvent) => {
  emit('overlay-click', event)

  if (props.overlayClosable) {
    emit('update:visible', false)
  }
}

useLockScroll(() => props.visible, props.lockScroll)

// ============================ style ============================
const popupClass = computed(() => {
  return [bem.b(), bem.m(props.effect)]
})

const popupStyle = computed(() => {
  return {
    zIndex: zIndex.value,
  }
})
</script>
