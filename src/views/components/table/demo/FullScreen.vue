<template>
  <div class="flex flex-col h-screen">
    <s-status-bar />
    <div class="flex-1 min-h-0 rounded-t-xl overflow-hidden mx-2">
      <s-table
        :columns="columns"
        :data="data"
        style="height: 100%; white-space: nowrap"
        :header-cell-style="{
          backgroundColor: 'var(--s-color-primary)',
          color: 'var(--s-white)',
        }"
        header-cell-class-name="cell"
        cell-class-name="cell"
        :cell-style="
          ({ rowIndex, columnIndex }) => {
            return {
              backgroundColor: getBgColor(rowIndex, columnIndex),
            }
          }
        "
      ></s-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { columns, data } from './level-data'

const bgColor = [
  ['#e6edfd', '#f7f8fe'],
  ['#f7f8fe', '#fff'],
]

const getBgColor = (row: number, col: number) => {
  return bgColor[row % 2][col % 2]
}
</script>

<style lang="scss" scoped>
:deep(.cell) {
  padding: 6px 8px;
  height: 54px;
  white-space: nowrap;
  text-align: center;
  font-size: var(--s-font-size-sm);
}
</style>
