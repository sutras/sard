<template>
  <s-segmented v-model="value" :options="options">
    <s-segmented-item v-for="(option, index) in options" :key="index" :value="option.value">
      <div class="flex flex-col items-center py-1.5">
        <demo-icon :name="option.icon" />
        <div>{{ option.label }}</div>
      </div>
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
