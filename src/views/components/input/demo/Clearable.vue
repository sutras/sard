<template>
  <!-- 演示批次号可清除输入：扫码失败时允许手工修正，清除即整串作废避免脏批次流入 -->
  <s-input
    v-model="value"
    placeholder="扫描或输入批次号 例 L20241027-A03"
    clearable
    aria-label="批次号，可清除"
    data-field="batch-no"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('L20241027-A03')
</script>
