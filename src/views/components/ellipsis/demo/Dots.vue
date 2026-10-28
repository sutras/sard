<template>
  <!-- 工业语境：自定义省略符：位号类文本用「~~~」表示后续编号被省略 -->
  <s-card>
    <s-ellipsis :content="alarmRecord" dots="~~~" expand-text="更多" collapse-text="收起" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
