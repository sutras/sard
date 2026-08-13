<template>
  <s-table bordered :columns="multiColumns" :data="data" style="height: 250px">
    <template #action="{ row }">
      <s-button size="small" variant="link" @click="toast(row.id)">编辑</s-button>
    </template>
  </s-table>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { multiColumns, data } from './data'
</script>
