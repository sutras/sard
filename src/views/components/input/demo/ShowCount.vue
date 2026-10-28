<template>
  <!-- 演示点检备注与处置说明的字数上限：100 字对齐纸质点检记录的归档要求 -->
  <s-input
    v-model="value"
    showCount
    :maxlength="100"
    clearable
    placeholder="点检结论（例：导轨油位 65 %，光栅自检通过）"
    aria-label="点检结论，最多 100 字"
  />
  <s-input
    v-model="value2"
    type="textarea"
    showCount
    :maxlength="100"
    clearable
    placeholder="报警处置说明（例：E-1042 安全门联锁断开，已泄压并挂检修牌）"
    aria-label="报警处置说明，最多 100 字"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')
</script>
