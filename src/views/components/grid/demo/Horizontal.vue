<template>
  <s-grid direction="horizontal">
    <s-grid-item v-for="i in 4" :key="i" text="文字" #icon>
      <Image />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
</script>
