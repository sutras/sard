<template>
  <!-- 工业语境：巡检快捷入口（扫码 / 报修 / 急停）｜Icon 用法演示 -->
  <s-fab>
    <s-fab-item name="扫码报修" @click="onClick('扫码报修')">
      <demo-icon name="scan" />
    </s-fab-item>
    <s-fab-item name="转派维修" @click="onClick('转派维修')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="急停呼叫" @click="onClick('急停呼叫')">
      <demo-icon name="bell" />
    </s-fab-item>

    <template #entry="{ visible }">
      <demo-icon v-if="visible" name="close" />
      <demo-icon v-else name="list" />
    </template>
  </s-fab>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = (name: string) => {
  toast(`点击了: ${name}`)
}
</script>
