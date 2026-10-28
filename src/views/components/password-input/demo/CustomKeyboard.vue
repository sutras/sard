<template>
  <!-- 工业语境：班组长授权码输入｜CustomKeyboard 用法演示 -->
  <s-password-input
    v-model="value"
    type="underlined"
    custom-keyboard
    focused
    style="margin-bottom: 10px"
  />
  <s-keyboard
    @input="(v: string) => (value = (value + v).slice(0, 6))"
    @delete="value = value.slice(0, -1)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
