<template>
  <s-input v-model="value" showCount :maxlength="100" clearable placeholder="请输入" />
  <s-input
    v-model="value"
    type="textarea"
    showCount
    :maxlength="100"
    clearable
    placeholder="请输入"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
