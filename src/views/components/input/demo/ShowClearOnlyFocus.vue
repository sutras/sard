<template>
  <s-input v-model="value" placeholder="可清除的" clearable showClearOnlyFocus />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
