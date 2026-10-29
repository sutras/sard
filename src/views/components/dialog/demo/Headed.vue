<template>
  <s-list card>
    <s-list-item arrow hover title="工艺参数变更审批" @click="showAlert" />
    <s-list-item arrow hover title="解除安全联锁（需双人）" @click="showConfirm" />
    <s-list-item arrow hover title="参数变更审批（无标题）" @click="showAlertNoTitle" />
    <s-list-item arrow hover title="解除联锁（无标题）" @click="showConfirmNoTitle" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '参数变更已提交 · 风险 L2',
    message:
      '注塑机-A2 模温 92 °C → 96 °C 的变更申请已提交工艺工程师审批，审批通过前设备维持原参数运行。',
    confirmText: '知道了',
    buttonType: 'round',
    headed: true,
    overlayClosable: false,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '解除安全联锁 · 风险 L3',
    message:
      '解除后光栅保护失效，必须在 30 min 内完成调试并复位。需操作工与班组长双人到场并在纸质记录上签字。',
    cancelText: '保持联锁',
    confirmText: '双人确认解除',
    buttonType: 'round',
    headed: true,
    confirmProps: { color: 'danger' },
    overlayClosable: false,
  })
}

const showAlertNoTitle = () => {
  dialog.alert({
    message: '设定温度 132 °C 超出量程 0–120 °C，变更申请被规则引擎自动驳回。',
    confirmText: '返回修改',
    buttonType: 'round',
    headed: true,
    overlayClosable: false,
  })
}

const showConfirmNoTitle = () => {
  dialog.confirm({
    message: '该设备安全联锁处于「已旁路」状态，继续操作将记入违规台账。',
    cancelText: '取消操作',
    confirmText: '继续并记录',
    buttonType: 'round',
    headed: true,
    confirmProps: { color: 'danger' },
    overlayClosable: false,
  })
}
</script>
