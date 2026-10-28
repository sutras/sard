<template>
  <!-- 工业语境：报警中心列表单行截断：每条记录只占一行，超出部分省略 -->
  <s-card>
    <s-ellipsis :content="alarmRecord" />
  </s-card>
</template>

<script setup lang="ts">
import { alarmRecord } from './shared'
</script>
