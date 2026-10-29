<template>
  <s-table
    underlined
    :columns="partialColumns"
    :data="partialData"
    data-scene="team-leader-board"
  ></s-table>
</template>

<script setup lang="ts">
import { partialColumns, partialData } from './data'
</script>
