<template>
  <!-- 工业语境：车间广播与安灯消息滚动｜Basic 用法演示 -->
  <div class="danmaku-box">
    <s-danmaku :list="list" loop />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref(Array.from({ length: 20 }, (_, i) => `AGV-0${(i % 9) + 1} 已完成上料交接`))
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}
</style>
