<template>
  <div :class="labelCellClass" :style="labelStyle">
    <slot name="label">{{ label }}</slot>
  </div>
  <div :class="contentCellClass" :style="contentStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted } from 'vue'
import { createBem } from '../../utils'
import {
  type DescriptionsItemProps,
  type DescriptionsItemSlots,
  type DescriptionsItemEmits,
  type DescriptionsItemMeta,
  defaultDescriptionsItemProps,
  descriptionsContextKey,
} from './common'

const props = withDefaults(defineProps<DescriptionsItemProps>(), defaultDescriptionsItemProps)

defineSlots<DescriptionsItemSlots>()

defineEmits<DescriptionsItemEmits>()

const bem = createBem('descriptions')

const context = inject(descriptionsContextKey, null)!

if (!context) {
  throw new Error('DescriptionsItem must be included in Descriptions.')
}

const colspan = computed(() => props.colspan ?? 1)

const rowspan = computed(() => props.rowspan ?? 1)

// 向 Descriptions 注册自身，以便父级统一计算每项内容格的跨度
const meta: DescriptionsItemMeta = {
  colspan: () => colspan.value,
  rowspan: () => rowspan.value,
}

onUnmounted(context.registerItem(meta))

const contentSpan = computed(() => {
  return context.getContentSpan(meta) ?? colspan.value * 2 - 1
})

const effectiveLabelAlign = computed(() => props.labelAlign ?? context.labelAlign)

// ============================ style ============================

const labelStyle = computed(() => {
  const style: Record<string, string> = {}

  if (context.labelWidth) {
    style.width = context.labelWidth
  }
  if (effectiveLabelAlign.value) {
    style.textAlign = effectiveLabelAlign.value
  }
  if (rowspan.value > 1) {
    style.gridRow = `span ${rowspan.value}`
  }

  return Object.keys(style).length ? style : undefined
})

const contentStyle = computed(() => {
  const style: Record<string, string> = {
    '--s-descriptions-content-span': String(contentSpan.value),
  }

  if (rowspan.value > 1) {
    style.gridRow = `span ${rowspan.value}`
  }

  return style
})

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
