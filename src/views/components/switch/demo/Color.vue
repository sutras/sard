<template>
  <s-switch v-model="checked" checked-color="var(--s-color-danger)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
