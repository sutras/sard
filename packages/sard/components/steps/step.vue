<template>
  <div :class="stepClass">
    <div :class="bem.e('header')">
      <div :class="[bem.e('line'), bem.e('line-before')]"></div>
      <div :class="bem.e('icon')">
        <slot name="icon" :status="currentStatus">
          <CheckCircleFill v-if="currentStatus === 'finish'" />
          <Circle v-else-if="currentStatus === 'process'" />
          <Circle v-else-if="currentStatus === 'wait'" />
          <XCircle v-else-if="currentStatus === 'error'" />
        </slot>
      </div>
      <div :class="[bem.e('line'), bem.e('line-after')]"></div>
    </div>
    <div :class="bem.e('body')">
      <slot :status="currentStatus">
        <div :class="bem.e('name')">{{ name }}</div>
        <div v-if="description" :class="bem.e('description')">
          {{ description }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem } from '../../utils'
import { type StepProps, type StepSlots, type StepEmits, type StepExpose } from './common'
import { stepsContextKey } from './common'
import { CheckCircleFill, Circle, XCircle } from '@sard/icons'

const props = withDefaults(defineProps<StepProps>(), {})

defineSlots<StepSlots>()

defineEmits<StepEmits>()

defineExpose<StepExpose>({})

const bem = createBem('step')

// main
const context = inject(stepsContextKey)!

if (!context) {
  throw new Error('Step must be included in Steps.')
}

const currentStatus = computed(() => {
  return (
    props.status ??
    (props.index < context.current
      ? 'finish'
      : props.index === context.current
        ? (context.status ?? 'process')
        : 'wait')
  )
})

const position = computed(() => {
  return props.index < context.current
    ? 'behind'
    : context.current === props.index
      ? 'self'
      : 'front'
})

// others
const stepClass = computed(() => {
  return [
    bem.b(),
    bem.m('center', context.center),
    bem.m(currentStatus.value),
    bem.m(position.value),
    bem.m(context.direction),
    bem.m('reverse', context.reverse),
  ]
})
</script>
