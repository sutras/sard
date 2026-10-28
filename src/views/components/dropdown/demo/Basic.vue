<template>
  <!-- 工业语境：设备按产线筛选与班次切换｜Basic 用法演示 -->
  <s-dropdown>
    <s-dropdown-item v-model="value1" :options="options1" />
    <s-dropdown-item v-model="value2" :options="options2" />
  </s-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options1 = [
  {
    label: '本班次',
    value: '1',
  },
  {
    label: '主轴转速优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]
const options2 = [
  {
    label: '近 1 小时',
    value: '1',
  },
  {
    label: '近 4 小时',
    value: '2',
  },
  {
    label: '50分钟内',
    value: '3',
  },
]

const value1 = ref('1')
const value2 = ref('1')
</script>
