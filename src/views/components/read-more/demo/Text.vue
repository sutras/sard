<template>
  <s-read-more close-text="展开阅读全文" open-text="收起节约空间">
    {{ longText }}
  </s-read-more>
</template>

<script setup lang="ts">
import { longText } from '@/data/text'
</script>
