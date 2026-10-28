<template>
  <!-- 工业语境：设备详情分区（参数 / 报警 / 点检）｜Scrollable 用法演示 -->
  <s-tabs v-model="value" :options="options" scrollable></s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type TabProps } from 'sard'

const value = ref(5)
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
