<template>
  <!-- 工业语境：启停与联锁开关｜Value 用法演示 -->
  <s-switch v-model="value" checked-value="run" unchecked-value="stop" />
  <div>设备状态：{{ value }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('run')
</script>
