<template>
  <!-- 工业语境：图标全集：用于挑选设备与业务图标 -->
  <s-grid :columns="3" bordered clickable>
    <s-grid-item v-for="(comp, key) in icons" :key="key" :text="key" @click="onClick(key)" #icon>
      <component :is="comp"></component>
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { clipboard, toast } from 'sard'
import * as icons from '@sard/icons'

const onClick = (name: string) => {
  clipboard.write(`<${name} />`).then(() => {
    toast.success('复制成功')
  })
}
</script>
