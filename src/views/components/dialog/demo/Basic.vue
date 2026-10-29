<template>
  <s-list card>
    <s-list-item
      arrow
      hover
      title="下发生产工单 WO-20241027-0083"
      description="需班组长授权"
      @click="showConfirm"
    />
    <s-list-item
      arrow
      hover
      title="设备停机 EQ-2023-076"
      description="不可逆，影响在制批次"
      @click="showStop"
    />
    <s-list-item
      arrow
      hover
      title="工艺参数越限提示"
      description="联锁阻断，无法继续"
      @click="showAlert"
    />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '参数已阻断',
    message:
      '设定温度 132 °C 超出设备允许量程 0–120 °C，指令未下发。请修正参数或提交工艺工程师审批。',
    confirmText: '返回修改',
    overlayClosable: false,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '下发生产工单 · 风险 L2',
    message:
      '工单 WO-20241027-0083 将下发至 注塑二线 / ST-11，批次 L20241027-B01（1200 件）。开始后 30 min 内不可变更工艺参数。',
    cancelText: '暂不下发',
    confirmText: '确认下发',
    overlayClosable: false,
  })
}

const showStop = () => {
  dialog.confirm({
    title: '设备停机 · 风险 L3（不可逆）',
    message:
      'EQ-2023-076 压铸机-D03 停机后液压系统泄压，在制件报废。恢复需设备主管现场复位并复检安全联锁。',
    cancelText: '保持运行',
    confirmText: '确认停机',
    confirmProps: { color: 'danger' },
    overlayClosable: false,
  })
}
</script>
