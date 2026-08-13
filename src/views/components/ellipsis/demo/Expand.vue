<template>
  <s-card>
    <s-ellipsis :content="contentEn" expand-text="展开" collapse-text="收起" />
  </s-card>
</template>

<script setup lang="ts">
import { contentEn } from './shared'
</script>
