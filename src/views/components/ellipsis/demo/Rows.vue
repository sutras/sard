<template>
  <!-- 工业语境：两行截断：适配看板卡片高度，兼顾可读性与信息密度 -->
  <s-card>
    <s-ellipsis :content="alarmRecord" expand-text="展开" collapse-text="收起" :rows="2" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
