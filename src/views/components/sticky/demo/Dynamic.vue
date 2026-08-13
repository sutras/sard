<template>
  <div style="margin-inline-start: 60px">
    <s-button @click="visible = true">点击生成</s-button>
    <s-sticky :margin-top="-safeAreaInsets.top" style="margin-top: 10px">
      <s-button v-if="visible">动态生成</s-button>
    </s-sticky>
  </div>
</template>

<script setup lang="ts">
import { safeAreaInsets } from 'sard'
import { ref } from 'vue'

const visible = ref(false)
</script>
