<template>
  <div :class="gridClass" :style="gridStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, createBem } from '../../utils'
import { type GridProps, type GridSlots, defaultGridProps } from './common'

const props = withDefaults(defineProps<GridProps>(), defaultGridProps)

defineSlots<GridSlots>()

const bem = createBem('grid')

const gridClass = computed(() => {
  return [
    bem.b(),
    bem.m('bordered', props.bordered && props.gap <= 0),
    bem.m('surround', props.bordered && props.gap > 0),
    bem.m('square', props.square),
    bem.m('clickable', props.clickable),
    bem.m(props.direction),
    bem.m('reverse', props.reverse),
  ]
})

const gridStyle = computed(() => {
  return {
    gap: addUnit(props.gap),
    gridTemplateColumns: `repeat(${props.columns}, minmax(0,1fr))`,
  }
})
</script>
