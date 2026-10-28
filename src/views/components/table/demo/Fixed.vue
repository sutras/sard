<template>
  <!-- 演示设备监控大屏双固定：首列设备编号 + 末尾联锁结论同时固定，横向滚动不丢合规信息 -->
  <s-table
    underlined
    :columns="columns"
    :data="data"
    style="height: 200px"
    aria-label="设备监控大屏（固定表头与首列）"
    data-scene="monitor-wall-pinned"
  ></s-table>
</template>

<script setup lang="ts">
import { columns, data } from './data'
</script>
