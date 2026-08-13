<template>
  <s-switch v-model="value" checked-value="on" unchecked-value="off" />
  <div>{{ value }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('on')
</script>
