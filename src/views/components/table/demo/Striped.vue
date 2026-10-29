<template>
  <s-table
    striped
    underlined
    :columns="partialColumns"
    :data="partialData"
    data-scene="shift-schedule"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
