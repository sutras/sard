<template>
  <Motion name="fade">
    <div
      v-show="visible"
      v-bind="$attrs"
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

// 蒙层的根是 Motion（内部是 Transition）：vapor 的 Transition 渲染 fragment 根，
// 无法继承透传属性（会 warn 并丢弃 class/style）→ 这里显式落到真正的蒙层元素上。
// 传进来的 class/style 由 v-bind 写入，组件自身的 class/style 后写，优先级更高。
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<OverlayProps>(), defaultOverlayProps)

defineSlots<OverlaySlots>()

const emit = defineEmits<OverlayEmits>()

const bem = createBem('overlay')

const onClick = (event: MouseEvent) => {
  emit('click', event)
}

// ============================ style ============================
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
