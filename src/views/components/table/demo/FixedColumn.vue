<template>
  <!-- 演示横向滚动时设备编号列固定：巡检人员始终能定位当前行对应的机台 -->
  <s-table
    underlined
    :columns="columns"
    :data="partialData"
    aria-label="设备参数表（固定设备编号列）"
    data-scene="device-parameter-table"
  ></s-table>
</template>

<script setup lang="ts">
import { columns, partialData } from './data'
</script>
