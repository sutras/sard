<template>
  <!-- 工业语境：产线侧边索引｜Basic 用法演示 -->
  <s-sidebar v-model="value">
    <s-sidebar-item value="1" label="标签名称" />
    <s-sidebar-item value="2" label="标签名称" />
    <s-sidebar-item value="3" label="标签名称" />
  </s-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
