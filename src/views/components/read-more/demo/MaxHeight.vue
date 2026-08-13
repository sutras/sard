<template>
  <s-read-more :max-height="100">
    {{ longText }}
  </s-read-more>
</template>

<script setup lang="ts">
import { longText } from '@/data/text'
</script>
