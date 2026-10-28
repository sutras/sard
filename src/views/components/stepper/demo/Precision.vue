<template>
  <!-- 工业语境：数量与参数步进输入｜Precision 用法演示 -->
  <s-stepper placeholder="投料量" input-width="64px" v-model="value" :precision="2" />
  <div>当前值：{{ value ?? '未填写' }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
