<template>
  <s-table
    :columns="partialColumns"
    :data="partialData"
    :show-header="false"
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
