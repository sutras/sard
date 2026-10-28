<template>
  <!-- 工业语境：点检照片与报告上传｜BeforeRead 用法演示 -->
  <s-upload :before-read="beforeRead" />
</template>

<script setup lang="ts">
import { toast } from 'sard'

const beforeRead = (file: File) => {
  if (file.name) {
    toast('阻止文件选择')
    return false
  }
  return true
}
</script>
