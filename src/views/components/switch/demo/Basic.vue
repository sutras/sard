<template>
  <!-- 工业语境：启停与联锁开关｜Basic 用法演示 -->
  <s-switch v-model="checked" aria-label="设备启停开关" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
