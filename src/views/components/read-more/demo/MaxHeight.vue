<template>
  <!-- 工业语境：长报警描述展开｜MaxHeight 用法演示 -->
  <s-read-more :max-height="100">
    {{ longText }}
  </s-read-more>
</template>

<script setup lang="ts">
import { longText } from '@/data/text'
</script>
