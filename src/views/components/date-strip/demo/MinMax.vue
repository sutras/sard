<template>
  <!-- 工业语境：按班次日期条切换历史数据｜MinMax 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-date-strip v-model="value" :min="new Date(2024, 0, 5)" :max="new Date(2024, 0, 19)" />
    </s-list-item>
    <s-list-item title="可选范围" value="2024-01-05 至 2024-01-19" />
    <s-list-item title="当前值" :value="value ? formatDate(value, 'YYYY-MM-DD') : 'undefined'" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from 'sard'

const value = ref(new Date(2024, 0, 10))
</script>
