<template>
  <s-list card>
    <s-list-item arrow hover title="显示提示框" @click="showAlert" />
    <s-list-item arrow hover title="显示确定框" @click="showConfirm" />
    <s-list-item arrow hover title="无标题" @click="showConfirmNoTitle" />
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'

const showAlert = () => {
  dialog.alert({
    title: '提示',
    message: '此功能暂时无法使用',
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '确定删除？',
  })
}

const showConfirmNoTitle = () => {
  dialog.confirm({
    message: '孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。青山绿水，白草红叶黄花。',
  })
}
</script>
