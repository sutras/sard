<template>
  <!-- 演示窄屏手持终端固定列宽：设备编号固定 120px，保证编号（EQ-2024-017）不被截断 -->
  <s-table
    bordered
    :columns="columns"
    :data="partialData"
    aria-label="手持终端设备表格（自定义列宽）"
    data-scene="handheld-terminal"
  ></s-table>
</template>

<script setup lang="ts">
import { partialData } from './data'

const columns = [
  {
    label: '设备编号',
    prop: 'code',
    width: 120,
  },
  {
    label: '工位',
    prop: 'station',
    width: 90,
  },
  {
    label: 'OEE',
    prop: 'oee',
    align: 'end',
  },
]
</script>
