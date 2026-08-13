<template>
  <s-list card>
    <s-list-item hover arrow title="文本提示" @click="onToast" />
    <s-list-item hover arrow title="很长的文本" @click="onLongToast" />
    <s-list-item hover arrow title="成功提示" @click="onSuccessToast" />
    <s-list-item hover arrow title="失败提示" @click="onFailToast" />
    <s-list-item hover arrow title="加载中提示" @click="onLoadingToast" />
    <s-list-item hover arrow title="隐藏提示" @click="onHideToast" />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onToast = () => {
  toast('文本提示')
}

const onLongToast = () => {
  toast('春山暖日和风，阑干楼阁帘栊，杨柳秋千院中。啼莺舞燕，小桥流水飞红。')
}

const onSuccessToast = () => {
  toast.success('成功')
}

const onFailToast = () => {
  toast.fail('失败')
}

const onLoadingToast = () => {
  toast.loading('加载中')
}

const onHideToast = () => {
  toast.hide()
}
</script>
