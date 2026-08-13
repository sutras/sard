<template>
  <s-list card>
    <s-list-item arrow hover title="显示提示框" @click="showAlert" />
    <s-list-item arrow hover title="显示确定框" @click="showConfirm" />
    <s-list-item arrow hover title="显示提示框-无标题" @click="showAlertNoTitle" />
    <s-list-item arrow hover title="显示确定框-无标题" @click="showConfirmNoTitle" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '提示',
    message: '此功能暂时无法使用',
    buttonType: 'round',
    headed: true,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '确定删除？',
    buttonType: 'round',
    headed: true,
  })
}

const showAlertNoTitle = () => {
  dialog.alert({
    message: '此功能暂时无法使用',
    buttonType: 'round',
    headed: true,
  })
}

const showConfirmNoTitle = () => {
  dialog.confirm({
    message: '确定删除？',
    buttonType: 'round',
    headed: true,
  })
}
</script>
