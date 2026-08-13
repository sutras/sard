<template>
  <s-tabs v-model="value" :options="options"></s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabProps } from 'sard'

const value = ref(1)
const options = ref<TabProps[]>([
  { label: '标签1', value: 1 },
  { label: '标签2', value: 2, disabled: true },
  { label: '标签3', value: 3 },
])
</script>
