<template>
  <div class="danmaku-box" dir="rtl">
    <s-danmaku :list="list" loop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { comments } from './shared'

const list = ref(Array.from({ length: 12 }, (_, i) => comments[i % comments.length]))
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}
</style>
