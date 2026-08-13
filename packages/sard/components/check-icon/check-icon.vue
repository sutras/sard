<template>
  <div :class="checkIconClass">
    <Check v-if="disabled && type === 'check'" />
    <Dash v-else-if="disabled && type === 'dash'" />
    <CheckCircleFill v-else-if="type === 'check' && shape === 'circle'" />
    <CheckSquareFill v-else-if="type === 'check' && shape === 'square'" />
    <DashCircleFill v-else-if="type === 'dash' && shape === 'circle'" />
    <DashSquareFill v-else-if="type === 'dash' && shape === 'square'" />
    <RecordCircle v-else-if="type === 'dot'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type CheckIconProps } from './common'
import {
  Check,
  CheckCircleFill,
  CheckSquareFill,
  Dash,
  DashCircleFill,
  DashSquareFill,
  RecordCircle,
} from '@sard/icons'

const props = withDefaults(defineProps<CheckIconProps>(), {
  shape: 'square',
  type: 'check',
})

const bem = createBem('check-icon')

const checkIconClass = computed(() => {
  return [bem.b(), bem.m(props.shape), bem.m(props.type), bem.is('disabled', props.disabled)]
})
</script>
