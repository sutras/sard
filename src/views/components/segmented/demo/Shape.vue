<template>
  <s-segmented v-model="value" :options="options" shape="round" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['早班', '中班', '晚班']

const value = ref('早班')
</script>
