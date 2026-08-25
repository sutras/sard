<template>
  <div :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { type ColProps, type ColSlots, rowSymbol } from './common'
import { createBem } from '../../utils'

const props = withDefaults(defineProps<ColProps>(), {})

defineSlots<ColSlots>()

const context = inject(rowSymbol)

if (!context) {
  throw new Error('Col must be included in Row.')
}

const bem = createBem('col')

// ============================ style ============================

const colClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.span, props.span !== undefined),
    bem.m(`offset-${props.offset}`, props.offset !== undefined),
  ]
})

const colStyle = computed(() => {
  const gutter = context.gutter

  return [
    props.order !== undefined
      ? {
          order: props.order,
        }
      : null,
    context.gap
      ? {
          paddingLeft: gutter[0] + gutter[1],
          paddingRight: gutter[0] + gutter[1],
        }
      : null,
  ]
})
</script>
