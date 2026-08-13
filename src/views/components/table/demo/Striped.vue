<template>
  <s-table striped underlined :columns="partialColumns" :data="partialData"></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
