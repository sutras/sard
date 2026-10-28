<template>
  <!-- 演示车间机台实时状态表：状态列用徽标表达状态机取值（RUN/IDLE/ALARM/STOP/MAINT），OEE 带百分号 -->
  <s-table
    :columns="partialColumns"
    :data="partialData"
    aria-label="车间机台实时状态表"
    data-scene="shopfloor-device-board"
    data-status-machine="RUN,IDLE,ALARM,STOP,MAINT"
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
