<template>
  <!-- 工业语境：报警与下发结果通知｜Type 用法演示 -->
  <s-list card>
    <s-list-item arrow hover title="已完成通知" @click="showSucessNotice" />
    <s-list-item arrow hover title="预警通知" @click="showWarningNotice" />
    <s-list-item arrow hover title="异常通知" @click="showErrorNotice" />
    <s-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </s-list>
</template>

<script setup lang="ts">
import { notify } from 'sard'

const showSucessNotice = () => {
  notify.success('这是一条通知')
}
const showWarningNotice = () => {
  notify.warning('这是一条通知')
}
const showErrorNotice = () => {
  notify.error('这是一条通知')
}
const hideNotice = () => notify.hide()
</script>
