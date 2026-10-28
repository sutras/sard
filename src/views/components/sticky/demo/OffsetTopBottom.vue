<template>
  <!-- 工业语境：表头与操作栏吸顶｜OffsetTopBottom 用法演示 -->
  <s-sticky
    :margin-top="-safeAreaInsets.top"
    :margin-bottom="-40"
    style="margin-inline-start: 220px"
  >
    <s-button>吸顶和吸底</s-button>
  </s-sticky>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
</script>
