<template>
  <s-space direction="vertical" size="large">
    <s-slider v-model="size" :min="0" :max="80" show-value />

    <s-space :size="size + 'px'">
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
    </s-space>
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(10)
</script>
