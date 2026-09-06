<template>
  <div :class="flexClass" :style="flexStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { defaultFlexProps, flexGap, type FlexProps, type FlexSlots } from './common'

const props = withDefaults(defineProps<FlexProps>(), defaultFlexProps)

defineSlots<FlexSlots>()

const bem = createBem('flex')

const presetGap = computed(() => {
  return flexGap.includes(props.gap)
})

// ============================ style ============================
const flexClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.direction, props.direction),
    bem.m('column', !props.direction && props.vertical),
    bem.m(props.gap, presetGap.value),
    bem.m('wrap', props.wrap),
    bem.m(`justify-${props.justify}`, props.justify),
    bem.m(`align-${props.align}`, props.align),
  ]
})

const flexStyle = computed(() => {
  return {
    flex: props.flex,
    gap: presetGap.value ? '' : props.gap,
  }
})
</script>
