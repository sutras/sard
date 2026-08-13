<template>
  <div
    ref="bubble"
    :class="floatingBubbleClass"
    :style="floatingBubbleStyle"
    @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type FloatingBubbleProps,
  type FloatingBubbleSlots,
  type FloatingBubbleEmits,
  defaultFloatingBubbleProps,
} from './common'
import { useFloatingBubble } from './useFloatingBubble'

const props = withDefaults(defineProps<FloatingBubbleProps>(), defaultFloatingBubbleProps)

defineSlots<FloatingBubbleSlots>()

const emit = defineEmits<FloatingBubbleEmits>()

const bem = createBem('floating-bubble')

// main
const { onTouchStart, onTouchMove, onTouchEnd, onPointerDown, position, initialized, animated } =
  useFloatingBubble(props, emit)

const onClick = (event: any) => {
  emit('click', event)
}

// others
const floatingBubbleClass = computed(() => {
  return [bem.b(), bem.m('animated', animated.value), bem.m('initialized', initialized.value)]
})

const floatingBubbleStyle = computed(() => {
  const { x, y } = position.value
  return {
    top: 0,
    transform: `translate3d(${x}px, ${y}px, 0)`,
  }
})
</script>
