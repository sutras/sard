<template>
  <s-list card>
    <s-list-item arrow hover title="确定按钮异步关闭" @click="showAlert" />
    <s-list-item arrow hover title="取消按钮异步关闭" @click="showConfirm" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.confirm({
    title: '提示',
    message: '点击确定按钮会在一秒钟后关闭',
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
    title: '提示',
    message: '点击取消按钮会在一秒钟后关闭',
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
