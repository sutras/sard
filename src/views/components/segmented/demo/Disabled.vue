<template>
  <!-- 工业语境：班次与时间粒度切换｜Disabled 用法演示 -->
  <s-flex vertical gap="medium">
    <s-segmented v-model="value" :options="options" disabled />
    <s-segmented v-model="value" :options="options" />
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: '早班', value: '早班' },
  { label: '中班', value: '中班', disabled: true },
  { label: '晚班', value: '晚班' },
]

const value = ref('早班')
</script>
