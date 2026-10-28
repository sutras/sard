<template>
  <!-- 工业语境：报警与下发结果通知｜Duration 用法演示 -->
  <s-list card>
    <s-list-item arrow hover title="显示不会消失的通知" @click="showNotice" />
    <s-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </s-list>
</template>

<script setup lang="ts">
import { notify } from 'sard'

const showNotice = () => {
  notify('这是一条通知', {
    timeout: 0,
  })
}
const hideNotice = () => {
  notify.hide()
}
</script>
