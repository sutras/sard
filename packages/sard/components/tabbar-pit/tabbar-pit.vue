<template>
  <div :class="tabbarPitClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type TabbarPitProps,
  type TabbarPitSlots,
  type TabbarPitEmits,
  type TabbarPitExpose,
} from './common'

const props = withDefaults(defineProps<TabbarPitProps>(), {})

defineSlots<TabbarPitSlots>()

defineEmits<TabbarPitEmits>()

const bem = createBem('tabbar-pit')

defineExpose<TabbarPitExpose>({})

const tabbarPitClass = computed(() => {
  return [bem.b(), bem.m('safe', props.safeAreaInsetBottom)]
})
</script>
