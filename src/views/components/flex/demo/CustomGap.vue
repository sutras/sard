<template>
  <s-flex vertical gap="large">
    <s-slider v-model="gap" :min="0" :max="80" show-value />

    <s-flex :gap="gap + 'px'">
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
    </s-flex>
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(10)
</script>
