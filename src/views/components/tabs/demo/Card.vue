<template>
  <s-tabs v-model="value" :options="options" type="card"></s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabProps } from 'sard'

const value = ref(1)
const options = ref<TabProps[]>([
  { label: '运行参数', value: 1 },
  { label: '报警记录', value: 2 },
  { label: '点检记录', value: 3 },
])
</script>
