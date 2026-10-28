<template>
  <!-- 工业语境：车间公告与安灯提示｜Dynamic 用法演示 -->
  <s-notice-bar>
    {{ text }}
  </s-notice-bar>

  <s-slider v-model="value" :min="0" :max="26" show-value class="mt-8 mx-4" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const value = ref(0)

const text = computed(() => {
  return `安灯提醒：${Array(value.value)
    .fill(0)
    .map((_, i) => {
      return String.fromCharCode(i + 65)
    })
    .join(' ')} 通道物料短缺，配送班组请到场。`
})
</script>
