<template>
  <!-- 工业语境：全局提示用于操作回执，独立实例分别固定在看板顶部与底部｜Create 用法演示 -->
  <s-list card>
    <s-list-item hover arrow title="同时显示多个提示" @click="onMultiple" />
    <s-list-item hover arrow title="独立控制显隐" @click="onIndependent" />
  </s-list>
</template>

<script setup lang="ts">
import { createToast, toast } from 'sard'

// createToast 用于创建独立的命令式提示实例，
// 可通过 defaultOptions 为实例设置默认属性，不同实例之间互不影响。
const topToast = createToast({ position: 'top' })
const bottomToast = createToast({ position: 'bottom' })
const loadingToast = createToast()

const onMultiple = () => {
  // 全局 toast 与独立创建的实例可以同时展示
  toast('工单已下发')
  topToast('报警已推送至看板顶部')
  bottomToast('点检记录已归档')
}

const onIndependent = () => {
  // loading 类型的提示不会自动隐藏，需调用对应实例的 hide 方法
  loadingToast.loading('正在同步点检记录…')

  setTimeout(() => {
    loadingToast.hide()
  }, 2000)
}
</script>
