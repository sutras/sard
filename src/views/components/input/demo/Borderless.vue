<template>
  <s-input v-model="value" placeholder="去除边框" borderless />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
