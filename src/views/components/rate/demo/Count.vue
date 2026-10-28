<template>
  <!-- 工业语境：设备点检评分｜Count 用法演示 -->
  <s-rate :model-value="3" :count="count" allow-half />
  <s-slider :min="1" :max="9" v-model="count" allow-half />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(3)
</script>
