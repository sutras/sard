<template>
  <div :class="bem.b()"></div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import {
  type StatusBarProps,
  type StatusBarSlots,
  type StatusBarEmits,
  type StatusBarExpose,
  defaultStatusBarProps,
} from './common'

const props = withDefaults(defineProps<StatusBarProps>(), defaultStatusBarProps)

defineSlots<StatusBarSlots>()

defineEmits<StatusBarEmits>()

const bem = createBem('status-bar')

defineExpose<StatusBarExpose>()
</script>
