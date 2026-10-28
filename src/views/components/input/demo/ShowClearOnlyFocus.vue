<template>
  <!-- 占位即属性：可清除的（仅聚焦时显示清除按钮） -->
  <s-input v-model="value" placeholder="可清除的" clearable showClearOnlyFocus />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
