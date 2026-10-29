<template>
  <s-list card>
    <s-list-item arrow hover title="下发工单（等待 MES 回执）" @click="showAlert" />
    <s-list-item arrow hover title="撤销工单（等待回执）" @click="showConfirm" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.confirm({
    title: '下发工单 · 等待回执',
    message: '确认后向 MES 提交 WO-20241027-0083，收到回执前按钮保持锁定（约 1 s）。',
    cancelText: '取消',
    confirmText: '下发',
    overlayClosable: false,
    beforeClose: (type, loading) => {
      if (type === 'confirm') {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
      if (loading.confirm) {
        return false
      }
    },
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '撤销工单 · 等待回执',
    message: '撤销请求提交后约 1 s 返回结果，期间不允许重复点击或关闭弹窗。',
    cancelText: '继续执行',
    confirmText: '确认撤销',
    overlayClosable: false,
    beforeClose: (type, loading) => {
      if (type === 'cancel') {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
      if (loading.cancel) {
        return false
      }
    },
  })
}
</script>
