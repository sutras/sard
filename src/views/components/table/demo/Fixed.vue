<template>
  <s-table
    underlined
    :columns="columns"
    :data="data"
    style="height: 200px"
    data-scene="monitor-wall-pinned"
  ></s-table>
</template>

<script setup lang="ts">
import { columns, data } from './data'
</script>
