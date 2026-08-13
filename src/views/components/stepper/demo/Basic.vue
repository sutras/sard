<template>
  <s-stepper placeholder="数量" v-model="value" @change="onChange" />
  <div>类型：{{ typeof value }}，值：{{ String(value) }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
