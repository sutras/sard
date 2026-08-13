<template>
  <s-table underlined :columns="columns" :data="partialData"></s-table>
</template>

<script setup lang="ts">
import { columns, partialData } from './data'
</script>
