<template>
  <div :class="descriptionsClass" :style="descriptionsStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRef } from 'vue'
import { createBem } from '../../utils'
import {
  type DescriptionsProps,
  type DescriptionsSlots,
  type DescriptionsEmits,
  type DescriptionsItemMeta,
  defaultDescriptionsProps,
  descriptionsContextKey,
} from './common'

const props = withDefaults(defineProps<DescriptionsProps>(), defaultDescriptionsProps)

defineSlots<DescriptionsSlots>()

defineEmits<DescriptionsEmits>()

const bem = createBem('descriptions')

const columns = computed(() => props.columns ?? 1)

// ============================ layout ============================

const items: DescriptionsItemMeta[] = []

// 注册顺序变化时触发重算
const registeredVersion = ref(0)

function registerItem(meta: DescriptionsItemMeta) {
  items.push(meta)
  registeredVersion.value++

  return () => {
    const index = items.indexOf(meta)
    if (index !== -1) {
      items.splice(index, 1)
      registeredVersion.value++
    }
  }
}

/**
 * 计算每个描述项内容格的列跨度。
 * 一个描述项占 `colspan * 2` 列（标签 1 列 + 内容 `colspan * 2 - 1` 列），
 * 最后一项的内容会填满当前行剩余列。
 */
const contentSpans = computed(() => {
  // 依赖注册顺序
  void registeredVersion.value

  const spans = new Map<DescriptionsItemMeta, number>()
  const columnCount = columns.value
  // 已完成的行（仅用于取行号）
  const result: number[][] = []
  let temp: number[] = []
  // 当前行剩余可容纳的 colspan 位置数
  let count = columnCount
  // 第 r 行被前面 rowspan 项占用的位置数
  const rowspanTemp: number[] = []

  items.forEach((meta, index) => {
    const nodeColspan = meta.colspan()
    const nodeRowspan = meta.rowspan()
    let rowNo = result.length

    rowspanTemp[rowNo] ||= 0

    if (nodeRowspan > 1) {
      for (let i = 1; i < nodeRowspan; i++) {
        rowspanTemp[rowNo + i] ||= 0
        rowspanTemp[rowNo + i]++
      }
    }

    // 消耗当前行被 rowspan 占用的位置
    while (rowspanTemp[rowNo] > 0) {
      count -= rowspanTemp[rowNo]
      rowspanTemp[rowNo] = 0
      if (count <= 0) {
        result.push(temp)
        temp = []
        count = columnCount
        rowNo++
      }
    }

    if (index === items.length - 1) {
      // 最后一项：未满则填满剩余列
      spans.set(meta, (nodeColspan < count ? count : nodeColspan) * 2 - 1)
      temp.push(index)
      result.push(temp)
      return
    }

    if (nodeColspan < count) {
      count -= nodeColspan
      spans.set(meta, nodeColspan * 2 - 1)
      temp.push(index)
    } else {
      const span = Math.min(nodeColspan, count)
      spans.set(meta, span * 2 - 1)
      temp.push(index)
      result.push(temp)
      count = columnCount
      temp = []
    }
  })

  return spans
})

function getContentSpan(meta: DescriptionsItemMeta) {
  return contentSpans.value.get(meta)
}

provide(
  descriptionsContextKey,
  reactive({
    bordered: toRef(() => props.bordered),
    colon: toRef(() => props.colon),
    labelWidth: toRef(() => props.labelWidth),
    labelAlign: toRef(() => props.labelAlign),
    registerItem,
    getContentSpan,
  }),
)

// ============================ style ============================

const descriptionsClass = computed(() => {
  return [bem.b(), bem.is('bordered', props.bordered), bem.has('colon', props.colon)]
})

const descriptionsStyle = computed(() => {
  const labelWidth = props.labelWidth

  return {
    gridTemplateColumns: labelWidth
      ? `repeat(${columns.value}, ${labelWidth} minmax(0, 1fr))`
      : `repeat(${columns.value * 2}, minmax(0, 1fr))`,
  }
})
</script>
