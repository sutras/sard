<template>
  <div :class="bem.b()" :style="statusBarStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type StatusBarProps,
  type StatusBarSlots,
  type StatusBarEmits,
  type StatusBarExpose,
  defaultStatusBarProps,
} from './common'
import { windowInfo } from '../config/windowInfo'

const props = withDefaults(defineProps<StatusBarProps>(), defaultStatusBarProps)

defineSlots<StatusBarSlots>()

defineEmits<StatusBarEmits>()

const bem = createBem('status-bar')

// main
const statusBarHeight = computed(() => {
  return windowInfo.statusBarHeight + 'px'
})

defineExpose<StatusBarExpose>()

const statusBarStyle = computed(() => {
  return {
    height: statusBarHeight.value,
  }
})
</script>
