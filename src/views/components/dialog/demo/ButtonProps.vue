<template>
  <s-list card>
    <s-list-item arrow hover title="显示提示框" @click="showAlert" />
    <s-list-item arrow hover title="显示确定框" @click="showConfirm" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '提示',
    message: '此功能暂时无法使用',
    confirmProps: {
      color: 'warning',
      variant: 'solid',
    },
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '确定删除？',
    confirmProps: {
      color: 'danger',
    },
  })
}
</script>
