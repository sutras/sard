<template>
  <div :class="bem.b()" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { splitUnit, createBem } from '../../utils'
import { type RowProps, type RowSlots, rowSymbol, mapJustify, mapAlign } from './common'

const props = withDefaults(defineProps<RowProps>(), {})

defineSlots<RowSlots>()

const bem = createBem('row')

// main
const gutter = computed(() => {
  if (props.gap) {
    const result = splitUnit(props.gap)
    return [result[0] / 2, result[1] || 'px'] as const
  }
  return [0, 'px'] as const
})

provide(
  rowSymbol,
  reactive({
    gap: toRef(() => props.gap),
    gutter,
  }),
)

// others
const rowStyle = computed(() => {
  return [
    {
      justifyContent: props.justify && mapJustify[props.justify],
      alignItems: props.align && mapAlign[props.align],
    },
    props.gap
      ? {
          marginLeft: -gutter.value[0] + gutter.value[1],
          marginRight: -gutter.value[0] + gutter.value[1],
        }
      : null,
  ]
})
</script>
