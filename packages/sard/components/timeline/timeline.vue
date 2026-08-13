<template>
  <div :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import { type TimelineProps, type TimelineSlots } from './common'

withDefaults(defineProps<TimelineProps>(), {})

defineSlots<TimelineSlots>()

const bem = createBem('timeline')
</script>
