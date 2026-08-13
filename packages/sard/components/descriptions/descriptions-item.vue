<template>
  <td :class="labelCellClass" colspan="1" :rowspan="rowspan" :style="labelStyle">
    <slot name="label">{{ label }}</slot>
  </td>
  <td :class="contentCellClass" :colspan="contentColspan" :rowspan="rowspan">
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem } from '../../utils'
import {
  type DescriptionsItemProps,
  type DescriptionsItemSlots,
  type DescriptionsItemEmits,
  defaultDescriptionsItemProps,
  descriptionsContextKey,
} from './common'

const props = withDefaults(defineProps<DescriptionsItemProps>(), defaultDescriptionsItemProps)

defineSlots<DescriptionsItemSlots>()

defineEmits<DescriptionsItemEmits>()

const bem = createBem('descriptions')

// main
const context = inject(descriptionsContextKey)!

if (!context) {
  throw new Error('DescriptionsItem must be included in Descriptions.')
}

const colspan = computed(() => props.colspan ?? 1)

const rowspan = computed(() => props.rowspan ?? 1)

const contentColspan = computed(() => props.contentColspan ?? colspan.value * 2 - 1)

const effectiveLabelWidth = computed(() => props.labelWidth ?? context.labelWidth)

const effectiveLabelAlign = computed(() => props.labelAlign ?? context.labelAlign)

const labelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (effectiveLabelWidth.value) {
    style.width = effectiveLabelWidth.value
  }
  if (effectiveLabelAlign.value) {
    style.textAlign = effectiveLabelAlign.value
  }
  return Object.keys(style).length ? style : undefined
})

// others
const labelCellClass = computed(() => {
  return [
    bem.e('item-label'),
    bem.is('bordered', context.bordered),
    bem.has('colon', context.colon),
  ]
})

const contentCellClass = computed(() => {
  return [bem.e('item-content'), bem.is('bordered', context.bordered)]
})
</script>
