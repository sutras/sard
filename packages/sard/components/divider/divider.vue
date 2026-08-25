<template>
  <div :class="dividerClass" :style="dividerStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type DividerProps,
  type DividerSlots,
  type DividerEmits,
  type DividerExpose,
  defaultDividerProps,
} from './common'

const props = withDefaults(defineProps<DividerProps>(), defaultDividerProps)

const slots = defineSlots<DividerSlots>()

defineEmits<DividerEmits>()

const bem = createBem('divider')

// ============================ style ============================

const dividerClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.position),
    bem.m('vertical', props.vertical),
    bem.m('hairline', props.hairline),
    bem.m('only-line', !slots.default),
  ]
})

const dividerStyle = computed(() => {
  return {
    borderStyle: props.type,
  }
})

defineExpose<DividerExpose>({})
</script>
