<template>
  <!-- 工业语境：车间模块宫格入口｜Border 用法演示 -->
  <s-grid bordered>
    <s-grid-item v-for="i in 8" :key="i" text="文字" #icon>
      <Image />
    </s-grid-item>
  </s-grid>

  <s-grid bordered :gap="10" class="mt-4">
    <s-grid-item v-for="i in 8" :key="i" text="文字" #icon>
      <Image />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
</script>
