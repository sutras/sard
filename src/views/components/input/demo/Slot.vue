<template>
  <s-input v-model="value" placeholder="扫描或输入设备位号 例 CNC-Lathe-01">
    <template #prepend>
      <demo-icon name="search" />
    </template>
  </s-input>
  <s-input v-model="value" placeholder="扫描或输入设备位号 例 CNC-Lathe-01" clearable>
    <template #append>
      <s-button variant="link" size="small" compact>查询</s-button>
    </template>
  </s-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
