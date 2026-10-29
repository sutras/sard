<template>
  <s-list card>
    <s-list-item>
      <s-color-picker v-model="color" show-presets :presets="presets" />
    </s-list-item>
    <s-list-item>当前颜色：{{ color }}</s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const presets = ['#1989FA', '#2ECC71', '#F59E0B', '#EF4444', '#8B5CF6']
const color = ref('#2ECC71')
</script>
