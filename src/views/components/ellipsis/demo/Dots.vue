<template>
  <s-card>
    <s-ellipsis :content="alarmRecord" dots="~~~" expand-text="更多" collapse-text="收起" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
