<template>
  <div :class="skeletonBlockClass" :style="skeletonBlockStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type SkeletonBlockProps } from '../skeleton/common'

const props = withDefaults(defineProps<SkeletonBlockProps>(), {})

const bem = createBem('skeleton')

// main

// others
const skeletonBlockClass = computed(() => {
  return [bem.e('block'), bem.m('animated', props.animated), bem.m('round', props.round)]
})

const skeletonBlockStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  }
})
</script>
