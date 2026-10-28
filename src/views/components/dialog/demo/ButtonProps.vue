<template>
  <!-- 演示危险操作按钮属性：停机/报废类确认按钮使用 danger 实心，与常规确认在视觉上分级 -->
  <s-list card aria-label="危险操作确认列表">
    <s-list-item arrow hover title="暂停产线（可恢复）" @click="showAlert" />
    <s-list-item arrow hover title="报废在制批次（不可逆）" @click="showConfirm" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '产线暂停 · 风险 L1',
    message: '机加工一线将暂停 15 min 等待来料，已下发工位的在制件保留在当前工序，可随时恢复。',
    confirmText: '知道了',
    confirmProps: {
      color: 'warning',
      variant: 'solid',
    },
    overlayClosable: false,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '报废在制批次 · 风险 L3',
    message:
      '批次 L20241027-B01 共 1200 件将标记为报废，质量记录归档后不可撤销。需质量工程师与班组长双人确认。',
    cancelText: '取消',
    confirmText: '确认报废',
    confirmProps: {
      color: 'danger',
    },
    overlayClosable: false,
  })
}
</script>
