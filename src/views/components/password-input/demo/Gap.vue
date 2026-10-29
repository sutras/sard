<template>
  <s-password-input v-model="value" gap="0" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
