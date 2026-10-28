<template>
  <!-- 工业语境：设备详情分区（参数 / 报警 / 点检）｜Basic 用法演示 -->
  <s-tabs v-model="value" :options="options"></s-tabs>
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
