<template>
  <s-space direction="vertical">
    <s-segmented v-model="value" :options="options" disabled />
    <s-segmented v-model="value" :options="options" />
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly', disabled: true },
  { label: 'Monthly', value: 'Monthly' },
]

const value = ref('Daily')
</script>
