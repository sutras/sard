<template>
  <!-- 工业语境：列表项滑动操作（确认 / 转派）｜Async 用法演示 -->
  <s-list card>
    <s-list-item style="padding: 0">
      <s-swipe-action>
        <s-list-item title="右边插槽" value="参数明细" />
        <template #right="{ hide, asyncHide }">
          <s-button color="danger" square auto-height @click="onDelete(asyncHide)">解除</s-button>
          <s-button color="primary" square auto-height @click="hide">取消</s-button>
        </template>
      </s-swipe-action>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { dialog, type SwipeActionAsyncHide } from 'sard'

const asyncFetch = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const onDelete = (asyncHide: SwipeActionAsyncHide) => {
  asyncHide((resolve, reject) => {
    dialog.confirm('确认解除设备绑定？', {
      beforeClose(type) {
        if (type === 'confirm') {
          return asyncFetch().then(resolve).catch(reject)
        }
        reject()
        return true
      },
    })
  })
}
</script>
