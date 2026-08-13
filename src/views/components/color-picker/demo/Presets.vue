<template>
  <s-list card>
    <s-list-item>
      <s-color-picker v-model="color" show-presets />
    </s-list-item>
    <s-list-item>当前颜色：{{ color }}</s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#2ECC71')
</script>
