<template>
  <!-- 工业语境：启停与联锁开关｜Size 用法演示 -->
  <s-switch v-model="checked" size="24px" aria-label="设备启停开关（小尺寸，用于巡检端列表）" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
