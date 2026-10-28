<template>
  <!-- 工业语境：设备点检评分｜Basic 用法演示 -->
  <s-rate v-model="value" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
