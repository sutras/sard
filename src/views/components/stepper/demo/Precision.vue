<template>
  <s-stepper placeholder="数量" v-model="value" :precision="2" />
  <div>类型：{{ typeof value }}，值：{{ String(value) }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
