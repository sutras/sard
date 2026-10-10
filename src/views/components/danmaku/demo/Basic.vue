<template>
  <div class="danmaku-box">
    <s-danmaku :list="list" loop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref(Array.from({ length: 20 }, (_, i) => `用户${i + 1} 进入直播间`))
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}
</style>
