<template>
  <s-list card>
    <s-list-item arrow hover title="点检超时提醒" @click="showAlert" />
    <s-list-item arrow hover title="设备切换至维护模式" @click="showConfirm" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '点检超时',
    message: 'ST-11 班前点检已超时 18 min，设备将保持停机状态直至点检记录上传。',
    confirmText: '立即点检',
    buttonType: 'round',
    overlayClosable: false,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '切换至维护模式',
    message: '设备将退出生产排程并挂「维护中」牌，预计 2 h 后恢复。',
    cancelText: '保持运行',
    confirmText: '切换维护',
    buttonType: 'round',
    overlayClosable: false,
  })
}
</script>
