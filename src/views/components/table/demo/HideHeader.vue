<template>
  <!-- 演示移动巡检端隐藏表头：设备编号 + 状态徽标 + 联锁结论压成可扫读的行 -->
  <s-table
    :columns="partialColumns"
    :data="partialData"
    :show-header="false"
    aria-label="移动巡检端设备列表（无表头）"
    data-scene="inspection-mobile"
  >
    <template #status="{ row }">
      <s-tag :color="row.statusColor" variant="filled" size="small" round>
        {{ row.statusLabel }}
      </s-tag>
    </template>
  </s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
