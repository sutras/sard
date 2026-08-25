<template>
  <div :class="progressCircleClass" :style="progressCircleStyle">
    <svg viewBox="0 0 100 100" :class="bem.e('graph')">
      <circle
        cx="50"
        cy="50"
        fill="none"
        :class="bem.e('track')"
        :stroke-width="thickness"
        :r="radius"
        :style="{
          stroke: trackColor,
        }"
      />
      <circle
        cx="50"
        cy="50"
        fill="none"
        :class="bem.e('fill')"
        stroke-dashoffset="0"
        stroke-linecap="round"
        transform="rotate(-90)"
        :stroke-dasharray="getRingPercent(percent, radius)"
        :stroke-width="thickness"
        :r="radius"
        :style="{
          transformOrigin: 'center',
          stroke: color,
        }"
      />
    </svg>
    <slot>
      <div v-if="!status" :class="bem.e('text')">{{ percent }}%</div>
      <div v-if="status" :class="bem.e('status')">
        <CheckCircleFill v-if="status === 'success'" />
        <WarningFill v-else-if="status === 'warning'" />
        <XCircleFill v-else-if="status === 'error'" />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type ProgressCircleProps,
  type ProgressCircleSlots,
  defaultProgressCircleProps,
} from './common'
import { CheckCircleFill, WarningFill, XCircleFill } from '@sard/icons'

const props = withDefaults(defineProps<ProgressCircleProps>(), defaultProgressCircleProps)

defineSlots<ProgressCircleSlots>()

const bem = createBem('progress-circle')

const getRingPercent = (percent: number, r: number) => {
  const perimeter = Math.PI * 2 * r
  return (percent / 100) * perimeter + ' ' + perimeter
}

const radius = computed(() => {
  return 50 - props.thickness / 2
})

const progressCircleClass = computed(() => {
  return [bem.b(), bem.m(props.status, props.status)]
})

const progressCircleStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
  }
})
</script>
