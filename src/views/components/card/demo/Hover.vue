<template>
  <s-card title="压铸机-D03" hover data-device-code="EQ-2023-076" @click="onClick">
    <template #extra>
      <s-tag color="default" variant="filled" size="small" round data-status="STOP">停机</s-tag>
    </template>
    <p>停机原因：液压系统超压保护触发（P-3117），已挂检修牌。</p>
    <p>
      安全联锁：
      <span style="color: var(--s-color-danger)">已旁路</span>
      （旁路单号 LK-20241027-02）
    </p>
  </s-card>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = () => {
  toast('进入 EQ-2023-076 设备详情')
}
</script>
