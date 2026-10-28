<template>
  <!-- 工业语境：车间模块宫格入口｜Horizontal 用法演示 -->
  <s-grid direction="horizontal">
    <s-grid-item v-for="i in 4" :key="i" text="文字" #icon>
      <Image />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
</script>
