<template>
  <!-- 演示多行点检备注输入：纸质记录转为结构化文本的最小形态 -->
  <s-input
    v-model="value"
    placeholder="点检备注（多行）：例导轨油位 65 %，光栅自检通过"
    type="textarea"
    :rows="2"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
