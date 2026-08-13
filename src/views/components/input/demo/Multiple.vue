<template>
  <s-input v-model="value" placeholder="请输入" type="textarea" :rows="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
