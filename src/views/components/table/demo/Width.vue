<template>
  <s-table bordered :columns="columns" :data="partialData" data-scene="handheld-terminal"></s-table>
</template>

<script setup lang="ts">
import { partialData } from './data'

const columns = [
  {
    label: '设备编号',
    prop: 'code',
    width: 120,
  },
  {
    label: '工位',
    prop: 'station',
    width: 90,
  },
  {
    label: 'OEE',
    prop: 'oee',
    align: 'end',
  },
]
</script>
