<template>
  <!-- 工业语境：点检项与安全前置勾选｜GroupOptions 用法演示 -->
  <s-checkbox-group v-model="value" :options="options"></s-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])

const options = ['导轨油位', '主轴温度', '振动值'].map((label, i) => ({
  value: `option${i + 1}`,
  label,
}))
</script>
