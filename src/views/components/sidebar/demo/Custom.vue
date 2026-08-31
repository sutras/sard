<template>
  <s-sidebar v-model="value">
    <s-sidebar-item value="1">
      <s-badge dot>标签名称</s-badge>
    </s-sidebar-item>
    <s-sidebar-item value="2">
      <s-badge :value="10">标签名称</s-badge>
    </s-sidebar-item>
    <s-sidebar-item value="3">
      <s-badge color="var(--s-color-success)" value="推荐">标签名称</s-badge>
    </s-sidebar-item>
  </s-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
