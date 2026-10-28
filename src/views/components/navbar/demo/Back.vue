<template>
  <!-- 工业语境：车间看板顶部导航与权限入口｜Back 用法演示 -->
  <s-navbar title="设备参数" show-back back-text="返回" @back="onBack" />
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onBack = () => {
  toast('返回上一页')
}
</script>
