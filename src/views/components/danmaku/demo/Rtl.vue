<template>
  <div class="danmaku-box" dir="rtl">
    <s-danmaku :list="list" loop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref(Array.from({ length: 12 }, (_, i) => `弹幕 ${i + 1} 从左侧进入`))
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}
</style>
