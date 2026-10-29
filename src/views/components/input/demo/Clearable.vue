<template>
  <s-input
    v-model="value"
    placeholder="扫描或输入批次号 例 L20241027-A03"
    clearable
    data-field="batch-no"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('L20241027-A03')
</script>
