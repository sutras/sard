<template>
  <s-list card>
    <s-list-item arrow hover title="显示通知" @click="showNotice" />
    <s-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </s-list>
</template>

<script setup lang="ts">
import { notify } from 'sard'

const showNotice = () => {
  notify('这是一条通知')
}
const hideNotice = () => {
  notify.hide()
}
</script>
