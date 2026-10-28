<template>
  <!-- 演示班组长看板下边框样式：同一批机台数据，弱化分隔线以提升状态列对比度 -->
  <s-table
    underlined
    :columns="partialColumns"
    :data="partialData"
    aria-label="班组长看板机台列表（下边框）"
    data-scene="team-leader-board"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
