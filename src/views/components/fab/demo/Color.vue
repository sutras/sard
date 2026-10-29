<template>
  <s-fab background="linear-gradient(300deg, rgb(245, 52, 35) 0%, rgb(246, 127, 72) 100%)">
    <s-fab-item name="扫码报修" background="rgb(59, 190, 136)" @click="onClick('扫码报修')">
      <demo-icon name="scan" />
    </s-fab-item>
    <s-fab-item name="转派维修" background="rgb(247, 149, 59)" @click="onClick('转派维修')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="急停呼叫" background="rgb(52, 147, 240)" @click="onClick('急停呼叫')">
      <demo-icon name="bell" />
    </s-fab-item>
  </s-fab>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = (name: string) => {
  toast(`点击了: ${name}`)
}
</script>
