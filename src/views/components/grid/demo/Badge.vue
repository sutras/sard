<template>
  <!-- 工业语境：车间模块宫格入口｜Badge 用法演示 -->
  <s-grid :columns="2">
    <s-grid-item text="文字" #icon>
      <s-badge dot>
        <Image />
      </s-badge>
    </s-grid-item>
    <s-grid-item text="文字" #icon>
      <s-badge :value="999">
        <Image />
      </s-badge>
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
</script>
