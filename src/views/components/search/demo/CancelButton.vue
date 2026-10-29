<template>
  <s-search
    placeholder="输入设备位号 / 批次号"
    cancel="退出"
    @cancel="toast('已退出检索，返回设备列表')"
  />
</template>

<script setup lang="ts">
import { toast } from 'sard'
</script>
