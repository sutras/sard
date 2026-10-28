<template>
  <!-- 工业语境：表头与操作栏吸顶｜OffsetTop 用法演示 -->
  <s-sticky :margin-top="-safeAreaInsets.top">
    <s-button>吸顶</s-button>
  </s-sticky>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
</script>
