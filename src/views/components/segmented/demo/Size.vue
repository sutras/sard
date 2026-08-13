<template>
  <s-segmented v-model="value" :options="options" :size="value" />
</template>

<script setup lang="ts">
import { type SegmentedSize } from 'sard'
import { ref } from 'vue'

const options: SegmentedSize[] = ['small', 'medium', 'large']

const value = ref<SegmentedSize>('medium')
</script>
