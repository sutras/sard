<template>
  <!-- 工业语境：大屏悬浮报警计数｜Basic 用法演示 -->
  <s-floating-bubble @click="toast('点击了')">
    <demo-icon name="chat-dots" size="24px" />
  </s-floating-bubble>
</template>

<script setup lang="ts">
import { toast } from 'sard'
</script>
