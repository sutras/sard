<template>
  <!-- 工业语境：风险等级与班次单选｜GroupOptions 用法演示 -->
  <s-radio-group v-model="value" :options="options"></s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option2')

const options = Array(3)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `工位 ST-0${i + 1}`,
    }
  })
</script>
