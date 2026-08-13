<template>
  <col ref="col" :style="getColStyle(column)" />
</template>

<script setup lang="ts">
import { useTemplateRef, type CSSProperties } from 'vue'
import { useResizeObserver } from '../../use'
import { type TableColProps, type TableColumnProps } from './common'
import { useColumnConsume } from './useColumn'
import { addUnit } from '../../utils'

const props = defineProps<TableColProps>()

const colRef = useTemplateRef('col')

const member = useColumnConsume(props)

useResizeObserver(colRef, (size) => {
  member.width = size.width
})

const getColStyle = (column: TableColumnProps<any>) => {
  let style: CSSProperties = {}

  if (column.width) {
    const width = addUnit(column.width)
    style.width = style.minWidth = style.maxWidth = width
  }
  if (column.minWidth) {
    const minWidth = addUnit(column.minWidth)
    style.minWidth = minWidth
  }

  return style
}
</script>
