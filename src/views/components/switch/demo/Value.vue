<template>
  <s-switch v-model="value" checked-value="run" unchecked-value="stop" />
  <div>设备状态：{{ value }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('run')
</script>
