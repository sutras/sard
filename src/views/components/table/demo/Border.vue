<template>
  <s-table bordered :columns="partialColumns" :data="partialData" data-scene="qc-station"></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
