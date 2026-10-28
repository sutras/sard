<template>
  <!-- 工业语境：班次与时间粒度切换｜Custom 用法演示 -->
  <s-segmented v-model="value" :options="options">
    <s-segmented-item v-for="option in options" :value="option.value">
      <demo-icon :name="option.icon" class="me-1" />
      {{ option.label }}
    </s-segmented-item>
  </s-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    label: '设备',
    value: 'device',
    icon: 'warehouse',
  },
  {
    label: '工单',
    value: 'order',
    icon: 'work-order',
  },
  {
    label: '报警',
    value: 'alarm',
    icon: 'alarm',
  },
]

const value = ref('device')
</script>
