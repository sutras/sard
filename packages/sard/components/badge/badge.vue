<template>
  <div v-if="slots.default" :class="bem.e('wrapper')">
    <slot></slot>
    <div :class="badgeClass" :style="badgeStyle">
      <slot name="value">
        {{ innerValue }}
      </slot>
    </div>
  </div>
  <div v-else :class="badgeClass" :style="badgeStyle">
    <slot name="value">
      {{ innerValue }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type BadgeProps, type BadgeSlots, defaultBadgeProps } from './common'

const props = withDefaults(defineProps<BadgeProps>(), defaultBadgeProps)

const slots = defineSlots<BadgeSlots>()

const bem = createBem('badge')

const zeroHide = computed(() => {
  return !props.dot && props.value === 0 && !props.showZero && !slots.value
})

const innerValue = computed(() => {
  return props.dot
    ? ''
    : typeof props.value === 'number' && props.value > props.max
      ? `${props.max}+`
      : props.value === 0 && !props.showZero
        ? ''
        : props.value
})

// ============================ style ============================
const badgeClass = computed(() => {
  return [
    bem.b(),
    bem.m('fixed', props.fixed || !!slots.default),
    bem.m('zero-hide', zeroHide.value),
    bem.m('dot', props.dot),
  ]
})

const badgeStyle = computed(() => {
  return {
    background: props.color,
    color: props.textColor,
  }
})
</script>
