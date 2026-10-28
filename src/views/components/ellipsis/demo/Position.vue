<template>
  <!-- 工业语境：三种省略位置：头部（保留结论）、中部（保留首尾）、尾部（保留起因） -->
  <s-list card>
    <s-list-item>
      <s-ellipsis
        :content="alarmRecord"
        :rows="3"
        position="start"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
    <s-list-item>
      <s-ellipsis
        :content="alarmRecord"
        :rows="3"
        position="middle"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
    <s-list-item>
      <s-ellipsis
        :content="alarmRecord"
        :rows="3"
        position="end"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
