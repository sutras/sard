<template>
  <s-space direction="vertical" size="large">
    <s-radio-group v-model="size" direction="horizontal" :options="spaceSizes" />

    <s-space :size="size">
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
      <s-button>按钮</s-button>
    </s-space>
  </s-space>
</template>

<script setup lang="ts">
import { spaceSizes, type SpaceSize } from 'sard'
import { ref } from 'vue'

const size = ref<SpaceSize>('medium')
</script>
