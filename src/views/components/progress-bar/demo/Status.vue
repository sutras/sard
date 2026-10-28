<template>
  <!-- 工业语境：OEE 与电量进度｜Status 用法演示 -->
  <s-progress-bar :percent="value" status="success" />
  <s-progress-bar :percent="value" status="warning" style="margin-top: 10px" />
  <s-progress-bar :percent="value" status="error" style="margin-top: 10px" />

  <s-stepper v-model="value" :min="0" :max="100" :step="10" class="mt-2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
