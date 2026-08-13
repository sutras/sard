<template>
  <s-table bordered :columns="columns" :data="partialData"></s-table>
</template>

<script setup lang="ts">
import { partialData } from './data'

const columns = [
  {
    label: 'ID',
    prop: 'id',
    width: 50,
  },
  {
    label: '姓名',
    prop: 'name',
    width: 100,
  },
  {
    label: '城市',
    prop: 'city',
  },
]
</script>
