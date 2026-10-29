<template>
  <s-table
    underlined
    :columns="partialColumns"
    :data="data"
    style="height: 200px"
    data-scene="monitor-wall"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, data } from './data'
</script>
