<template>
  <s-switch v-model="checked" @change="onChange">
    <template #checked-text>
      <Success />
    </template>
    <template #unchecked-text>
      <Close />
    </template>
  </s-switch>
</template>

<script setup lang="ts">
import { Close, Success } from '@sard/icons'
import { ref } from 'vue'

const checked = ref(true)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
