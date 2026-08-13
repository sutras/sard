<template>
  <s-tabs v-model="value" :options="options" type="pill" scrollable></s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabProps } from 'sard'

const value = ref(1)
const options = ref<TabProps[]>(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: `标签${i + 1}`,
        value: i + 1,
      }
    }),
)
</script>
