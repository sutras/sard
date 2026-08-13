<template>
  <s-table underlined :columns="columns" :data="data" style="height: 200px"></s-table>
</template>

<script setup lang="ts">
import { columns, data } from './data'
</script>
