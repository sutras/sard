<template>
  <!-- 工业语境：车间广播与安灯消息滚动｜Interact 用法演示 -->
  <div class="danmaku-box">
    <s-danmaku ref="danmaku" :list="list" loop />
  </div>

  <div class="toolbar">
    <s-button size="small" color="secondary" @click="danmakuRef?.pause()">暂停</s-button>
    <s-button size="small" color="secondary" @click="danmakuRef?.resume()">继续</s-button>
    <s-button size="small" @click="send">发送弹幕</s-button>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const danmakuRef = useTemplateRef('danmaku')

const list = ref(Array.from({ length: 10 }, (_, i) => `欢迎第 ${i + 1} 位观众`))

let seq = 0

const send = () => {
  seq++
  danmakuRef.value?.send(`这是一条新发送的弹幕 ${seq}`)
}
</script>

<style lang="scss" scoped>
.danmaku-box {
  color: #fff;
  border-radius: 8px;
  background-color: #1c1c1e;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
