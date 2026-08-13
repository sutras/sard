<template>
  <s-stepper placeholder="数量" v-model="value" :min="0" :max="5" />
  <div>类型：{{ typeof value }}，值：{{ String(value) }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
