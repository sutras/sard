<template>
  <!-- 演示多班次排产表：斑马纹降低跨班次读数错行率 -->
  <s-table
    striped
    underlined
    :columns="partialColumns"
    :data="partialData"
    aria-label="多班次机台排产表（斑马纹）"
    data-scene="shift-schedule"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
