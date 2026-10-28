<template>
  <!-- 工业语境：班次与时间粒度切换｜Basic 用法演示 -->
  <s-segmented v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['早班', '中班', '晚班']

const value = ref('早班')
</script>
