<template>
  <component :is="props.tag" :class="textClass" :style="textStyle">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type TextProps,
  type TextSlots,
  type TextEmits,
  type TextExpose,
  defaultTextProps,
} from './common'

const props = withDefaults(defineProps<TextProps>(), defaultTextProps)

defineSlots<TextSlots>()

defineEmits<TextEmits>()

const bem = createBem('text')

// ============================ style ============================
const textClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.color),
    bem.m(props.size),
    bem.m('truncated', props.truncated),
    bem.m('line-clamp', !!(props.lineClamp && props.lineClamp > 0)),
  ]
})

const textStyle = computed(() => {
  if (props.lineClamp && props.lineClamp > 0) {
    return {
      '-webkit-line-clamp': props.lineClamp,
    }
  }
  return {}
})
</script>
