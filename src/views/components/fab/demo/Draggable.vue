<template>
  <s-fab draggable>
    <s-fab-item name="首页" @click="onClick('首页')">
      <demo-icon name="house-door" />
    </s-fab-item>
    <s-fab-item name="分享好友" @click="onClick('分享好友')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="收藏" @click="onClick('收藏')">
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
