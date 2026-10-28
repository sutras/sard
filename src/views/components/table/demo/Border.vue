<template>
  <!-- 演示质检工位网格边框：字段与列线一并对齐，便于打印点检记录表单 -->
  <s-table
    bordered
    :columns="partialColumns"
    :data="partialData"
    aria-label="质检工位设备表格（全边框）"
    data-scene="qc-station"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
