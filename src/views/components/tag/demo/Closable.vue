<template>
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
