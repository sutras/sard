<template>
  <!-- 工业语境：红色仅用于急停/停机回路，普通启停必须用主色，避免颜色语义被稀释 -->
  <s-switch v-model="checked" checked-color="var(--s-color-danger)" aria-label="急停回路开关" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
