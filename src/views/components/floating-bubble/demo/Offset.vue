<template>
  <s-floating-bubble v-model:offset="offset" axis="both">
    <demo-icon name="chat-dots" size="24px" />
  </s-floating-bubble>

  <div class="mt-25 text-center">
    <span>x: {{ offset.x.toFixed(0) }}</span>
    <span class="ms-1">y: {{ offset.y.toFixed(0) }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const offset = ref({
  x: 200,
  y: 300,
})
</script>
