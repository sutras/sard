<template>
  <s-switch v-model="disabled" checked-text="禁用" unchecked-text="启用" class="mb-5" />

  <s-space direction="vertical">
    <s-stepper placeholder="数量" :disabled="disabled" variant="solid" />
    <s-stepper placeholder="数量" :disabled="disabled" variant="outlined" />
    <s-stepper placeholder="数量" :disabled="disabled" variant="accent" />
    <s-stepper placeholder="数量" :disabled="disabled" variant="ghost" />
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
</script>
