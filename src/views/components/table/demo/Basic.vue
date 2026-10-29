<template>
  <s-table
    :columns="partialColumns"
    :data="partialData"
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
