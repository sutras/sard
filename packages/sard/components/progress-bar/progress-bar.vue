<template>
  <div :class="progressBarClass">
    <div :class="bem.e('track')" :style="trackStyle">
      <div :class="bem.e('fill')" :style="fillStyle">
        <div v-if="showText && inside" :class="bem.e('text')">
          <slot>{{ percent }}%</slot>
        </div>
      </div>
    </div>
    <div v-if="showText && !inside && !status" :class="bem.e('text')">
      <slot>{{ percent }}%</slot>
    </div>
    <div v-if="status" :class="bem.e('status')">
      <CheckCircleFill v-if="status === 'success'" />
      <WarningFill v-else-if="status === 'warning'" />
      <XCircleFill v-else-if="status === 'error'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type ProgressBarProps, type ProgressBarSlots, defaultProgressBarProps } from './common'
import { CheckCircleFill, WarningFill, XCircleFill } from '@sard/icons'

const props = withDefaults(defineProps<ProgressBarProps>(), defaultProgressBarProps)

defineSlots<ProgressBarSlots>()

const bem = createBem('progress-bar')

const progressBarClass = computed(() => {
  return [
    bem.b(),
    bem.m('inside', props.inside),
    bem.m('striped', props.striped),
    bem.m('animated', props.animated),
    bem.m(props.status, props.status),
  ]
})

const trackStyle = computed(() => {
  return {
    height: props.thickness,
    backgroundColor: props.trackColor,
  }
})

const fillStyle = computed(() => {
  return {
    width: `${props.percent}%`,
    backgroundColor: props.color,
  }
})
</script>
