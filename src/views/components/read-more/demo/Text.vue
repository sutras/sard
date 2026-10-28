<template>
  <!-- 工业语境：长报警描述展开｜Text 用法演示 -->
  <s-read-more close-text="展开阅读全文" open-text="收起节约空间">
    {{ longText }}
  </s-read-more>
</template>

<script setup lang="ts">
import { longText } from '@/data/text'
</script>
