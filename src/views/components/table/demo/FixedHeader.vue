<template>
  <!-- 演示监控大屏固定表头：14 台设备滚动时列名常驻，避免错读温度与振动量纲 -->
  <s-table
    underlined
    :columns="partialColumns"
    :data="data"
    style="height: 200px"
    aria-label="设备监控大屏（固定表头）"
    data-scene="monitor-wall"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, data } from './data'
</script>
