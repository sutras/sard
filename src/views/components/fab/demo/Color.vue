<template>
  <s-fab background="linear-gradient(300deg, rgb(245, 52, 35) 0%, rgb(246, 127, 72) 100%)">
    <s-fab-item name="首页" background="rgb(59, 190, 136)" @click="onClick('首页')">
      <demo-icon name="house-door" />
    </s-fab-item>
    <s-fab-item name="分享好友" background="rgb(247, 149, 59)" @click="onClick('分享好友')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="收藏" background="rgb(52, 147, 240)" @click="onClick('收藏')">
      <demo-icon name="star" />
    </s-fab-item>
  </s-fab>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = (name: string) => {
  toast(`点击了: ${name}`)
}
</script>
