<template>
  <s-table :columns="partialColumns" :data="partialData" :show-header="false"></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
