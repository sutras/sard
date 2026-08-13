<template>
  <div :class="spaceClass" :style="spaceStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  defaultSpaceProps,
  spaceMapAlign,
  spaceMapJustify,
  spaceSizes,
  type SpaceProps,
  type SpaceSlots,
} from './common'

const props = withDefaults(defineProps<SpaceProps>(), defaultSpaceProps)

defineSlots<SpaceSlots>()

const bem = createBem('space')

// main

const presetSize = computed(() => {
  return spaceSizes.includes(props.size)
})

// others
const spaceClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.direction),
    bem.m(props.size, presetSize.value),
    bem.m('wrap', props.wrap),
  ]
})

const spaceStyle = computed(() => {
  return {
    gap: presetSize.value ? '' : props.size,
    alignItems: (props.align && spaceMapAlign[props.align]) ?? props.align,
    justifyContent: (props.justify && spaceMapJustify[props.justify]) ?? props.justify,
  }
})
</script>
