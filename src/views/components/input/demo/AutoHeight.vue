<template>
  <s-input v-model="value" type="textarea" auto-height rows="1" placeholder="自动高度" />
  <s-input
    v-model="value2"
    type="textarea"
    rows="1"
    :auto-height="{
      minHeight: 48,
    }"
    placeholder="最小高度"
  />
  <s-input
    v-model="value3"
    type="textarea"
    :auto-height="{
      maxHeight: 84,
    }"
    placeholder="最大高度"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
