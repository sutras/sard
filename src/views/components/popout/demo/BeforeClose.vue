<template>
  <!-- 工业语境：底部弹出层｜BeforeClose 用法演示 -->
  <s-list card>
    <s-list-item hover arrow title="紧凑弹出框" @click="compactVisible = true" />
    <s-list-item hover arrow title="宽松弹出框" @click="looseVisible = true" />
  </s-list>

  <s-popout
    v-model:visible="compactVisible"
    type="compact"
    title="设备参数"
    :before-close="beforeClose"
  >
    <div style="padding-inline-start: 16px; padding-inline-end: 16px">
      <div>弹出框参数明细</div>
      <div>弹出框参数明细</div>
      <div>弹出框参数明细</div>
    </div>
  </s-popout>

  <s-popout
    v-model:visible="looseVisible"
    type="loose"
    title="设备参数"
    :before-close="beforeClose"
  >
    <div style="padding-inline-start: 16px; padding-inline-end: 16px">
      <div>弹出框参数明细</div>
      <div>弹出框参数明细</div>
      <div>弹出框参数明细</div>
    </div>
  </s-popout>
</template>

<script setup lang="ts">
import type { PopoutBeforeClose } from 'sard'
import { ref } from 'vue'

const compactVisible = ref(false)
const looseVisible = ref(false)

const beforeClose: PopoutBeforeClose = (type, loading) => {
  if (type === 'confirm') {
    return new Promise((resolve) => setTimeout(resolve, 1500))
  }
  if (loading.confirm) {
    return false
  }
}
</script>
