<template>
  <s-sticky :margin-top="-safeAreaInsets.top">
    <s-button>吸顶</s-button>
  </s-sticky>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
</script>
