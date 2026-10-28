<template>
  <!-- 工业语境：OEE 环形指标｜Status 用法演示 -->
  <s-flex gap="medium">
    <s-progress-circle :percent="value" status="success" />
    <s-progress-circle :percent="value" status="warning" />
    <s-progress-circle :percent="value" status="error" />
  </s-flex>

  <s-stepper v-model="value" :min="0" :max="100" :step="10" class="mt-2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
