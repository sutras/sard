<template>
  <!-- 工业语境：班次与时间粒度切换｜Size 用法演示 -->
  <s-segmented v-model="value" :options="options" :size="value" />
</template>

<script setup lang="ts">
import { type SegmentedSize } from 'sard'
import { ref } from 'vue'

const options: SegmentedSize[] = ['small', 'medium', 'large']

const value = ref<SegmentedSize>('medium')
</script>
