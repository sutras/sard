<template>
  <s-switch v-model="checked" size="24px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
