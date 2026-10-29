<template>
  <s-table
    underlined
    :columns="columns"
    :data="partialData"
    data-scene="device-parameter-table"
  ></s-table>
</template>

<script setup lang="ts">
import { columns, partialData } from './data'
</script>
