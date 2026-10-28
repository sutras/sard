<template>
  <!-- 工业语境：班组长授权码输入｜PlainText 用法演示 -->
  <s-password-input v-model="value" plain-text @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
