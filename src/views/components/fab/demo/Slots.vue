<template>
  <!-- 工业语境：巡检快捷入口（扫码 / 报修 / 急停）｜Slots 用法演示 -->
  <s-fab>
    <s-fab-item name="扫码报修" @click="onClick('扫码报修')">
      <template #name>
        <span class="text-(--s-color-primary)">扫码报修</span>
      </template>
      <demo-icon name="scan" />
    </s-fab-item>

    <s-fab-item name="急停呼叫" @click="onClick('急停呼叫')">
      <template #name>
        <span class="text-(--s-color-danger)">急停呼叫（需授权）</span>
      </template>
      <demo-icon name="bell" />
    </s-fab-item>

    <template #entry="{ visible }">
      <span class="px-1 text-sm font-medium">{{ visible ? '收起' : '巡检' }}</span>
    </template>
  </s-fab>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = (name: string) => {
  toast(`已触发：${name}`)
}
</script>
