<template>
  <s-search placeholder="输入设备位号 / 批次号" search="查询" @search="onSearch" />
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onSearch = (keyword: string) => {
  toast(keyword ? `已按「${keyword}」筛选设备` : '请输入位号或批次号后再查询')
}
</script>
