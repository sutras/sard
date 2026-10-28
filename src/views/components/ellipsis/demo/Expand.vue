<template>
  <!-- 工业语境：设备档案里的处置记录默认收起为一行，点「展开」查看完整经过 -->
  <s-card>
    <s-ellipsis :content="alarmRecord" expand-text="展开" collapse-text="收起" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
