<template>
  <!-- 工业语境：风险等级与班次单选｜Size 用法演示 -->
  <s-radio-group v-model="value" size="24px">
    <s-radio value="option1">早班</s-radio>
    <s-radio value="option2">中班</s-radio>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
</script>
