<template>
  <s-alert
    closable
    type="warning"
    role="status"
    data-dismissible="acknowledge-only"
    @close="onClose"
  >
    维护到期：机械臂-R06 距下次保养 0 h（标准 C 周保，停机窗口 2 h），请安排停机计划。
  </s-alert>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClose = () => {
  toast('已记录知悉，维护计划仍保留，逾期将升级为报警')
}
</script>
