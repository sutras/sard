<template>
  <s-notice-bar>
    {{ text }}
  </s-notice-bar>

  <s-slider v-model="value" :min="0" :max="26" show-value class="mt-8 mx-4" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const value = ref(0)

const text = computed(() => {
  return `这是一条很长...${Array(value.value)
    .fill(0)
    .map((_, i) => {
      return String.fromCharCode(i + 65)
    })
    .join(' ')}...的公告！`
})
</script>
