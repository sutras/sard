<template>
  <div class="danmaku-box">
    <s-danmaku ref="danmaku" :list="list" loop />
  </div>

  <div class="toolbar">
    <s-button size="small" type="secondary" @click="danmakuRef?.pause()">暂停</s-button>
    <s-button size="small" type="secondary" @click="danmakuRef?.resume()">继续</s-button>
    <s-button size="small" @click="send">发送弹幕</s-button>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { comments } from './shared'

const danmakuRef = useTemplateRef('danmaku')

const list = ref(comments.slice())

let seq = 0

const send = () => {
  seq++
  danmakuRef.value?.send(`手动发送的弹幕 ${seq}`)
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
