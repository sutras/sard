<template>
  <!-- 工业语境：数量与参数步进输入｜Step 用法演示 -->
  <s-stepper placeholder="数量" input-width="52px" v-model="value" :step="5" />
  <div>当前值：{{ value ?? '未填写' }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
