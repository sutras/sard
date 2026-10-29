<template>
  <s-switch v-model="disabled" checked-text="禁用输入" unchecked-text="可编辑" class="mb-5" />

  <s-flex vertical gap="medium">
    <s-stepper placeholder="数量" input-width="52px" :disabled="disabled" variant="solid" />
    <s-stepper placeholder="数量" input-width="52px" :disabled="disabled" variant="outlined" />
    <s-stepper placeholder="数量" input-width="52px" :disabled="disabled" variant="accent" />
    <s-stepper placeholder="数量" input-width="52px" :disabled="disabled" variant="ghost" />
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
</script>
