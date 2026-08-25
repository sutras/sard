<template>
  <table :class="descriptionsClass">
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <component v-for="(child, colIndex) in row" :key="colIndex" :is="child" />
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef, useSlots, cloneVNode } from 'vue'
import { createBem, flatVNode } from '../../utils'
import {
  type DescriptionsProps,
  type DescriptionsSlots,
  type DescriptionsEmits,
  defaultDescriptionsProps,
  descriptionsContextKey,
} from './common'

const props = withDefaults(defineProps<DescriptionsProps>(), defaultDescriptionsProps)

defineSlots<DescriptionsSlots>()

defineEmits<DescriptionsEmits>()

const bem = createBem('descriptions')

provide(
  descriptionsContextKey,
  reactive({
    bordered: toRef(() => props.bordered),
    colon: toRef(() => props.colon),
    labelWidth: toRef(() => props.labelWidth),
    labelAlign: toRef(() => props.labelAlign),
  }),
)

const slots = useSlots()

const columns = computed(() => props.columns ?? 1)

const rows = computed(() => {
  if (!slots.default) return []

  const children = flatVNode(slots.default())
  // 最终行数组 VNode[][]
  const result: any[][] = []
  // 当前行暂存 VNode[]
  let temp: any[] = []
  // 当前行剩余可容纳的 colspan 位置数
  let count = columns.value
  // 第 r 行被前面 rowspan 项占用的位置数
  const rowspanTemp: number[] = []

  children.forEach((node, index) => {
    const nodeColspan = node.props?.colspan ?? 1
    const nodeRowspan = node.props?.rowspan ?? 1
    let rowNo = result.length
    rowspanTemp[rowNo] ||= 0

    if (nodeRowspan > 1) {
      for (let i = 1; i < nodeRowspan; i++) {
        rowspanTemp[rowNo + i] ||= 0
        rowspanTemp[rowNo + i]++
      }
    }
    // Consume all consecutive rowspan reservations for this row
    while (rowspanTemp[rowNo] > 0) {
      count -= rowspanTemp[rowNo]
      rowspanTemp[rowNo] = 0
      if (count <= 0) {
        result.push(temp)
        temp = []
        count = columns.value
        rowNo++
      }
    }

    if (index === children.length - 1) {
      temp.push(
        cloneVNode(node, {
          contentColspan: nodeColspan < count ? count * 2 - 1 : undefined,
        }),
      )
      result.push(temp)
      return
    }

    if (nodeColspan < count) {
      count -= nodeColspan
      temp.push(node)
    } else {
      const span = Math.min(nodeColspan, count)
      temp.push(
        cloneVNode(node, {
          contentColspan: span === nodeColspan ? undefined : span * 2 - 1,
        }),
      )
      result.push(temp)
      count = columns.value
      temp = []
    }
  })

  return result
})

// ============================ style ============================

const descriptionsClass = computed(() => {
  return [bem.b(), bem.is('bordered', props.bordered), bem.has('colon', props.colon)]
})
</script>
