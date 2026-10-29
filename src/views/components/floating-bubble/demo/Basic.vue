<template>
  <s-floating-bubble @click="toast('点击了')">
    <demo-icon name="chat-dots" size="24px" />
  </s-floating-bubble>
</template>

<script setup lang="ts">
import { toast } from 'sard'
</script>
