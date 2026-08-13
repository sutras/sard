<template>
  <Motion name="fade">
    <div
      v-show="visible"
      :class="overlayClass"
      :style="overlayStyle"
      @click="onClick"
      @touchmove.stop.prevent
    >
      <slot></slot>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type OverlayProps,
  type OverlaySlots,
  type OverlayEmits,
  defaultOverlayProps,
} from './common'
import Motion from '../motion/motion.vue'

const props = withDefaults(defineProps<OverlayProps>(), defaultOverlayProps)

defineSlots<OverlaySlots>()

const emit = defineEmits<OverlayEmits>()

const bem = createBem('overlay')

// main
const onClick = (event: MouseEvent) => {
  emit('click', event)
}

// others
const overlayClass = computed(() => {
  return [bem.b(), bem.m('transparent', props.transparent)]
})

const overlayStyle = computed(() => {
  return {
    zIndex: props.zIndex,
    backgroundColor: props.background,
  }
})
</script>
