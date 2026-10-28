<template>
  <!-- 工业语境：车间公告与安灯提示｜Linkable 用法演示 -->
  <s-notice-bar linkable @click="onClick">
    EQ-2023-204 注塑机-A2 安全门联锁断开已 12 min，设备主管请到 ST-11 现场复位。
  </s-notice-bar>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = () => {
  toast('navigate to')
}
</script>
