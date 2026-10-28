<template>
  <!-- 演示可移除的工单标记：移除即解除本工单与设备的绑定，需先确认无在制件 -->
  <s-tag color="danger" closable data-removable="work-order" @close="onClose">
    WO-20241027-0083 · 待开工
  </s-tag>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClose = () => {
  toast('解除绑定前请确认设备无在制件，操作已记入变更台账')
}
</script>
