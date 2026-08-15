<template>
  <s-list card>
    <s-list-item style="padding: 0">
      <s-swipe-action>
        <s-list-item title="右边插槽" value="内容" />
        <template #right="{ hide, asyncHide }">
          <s-button color="danger" square auto-height @click="onDelete(asyncHide)">删除</s-button>
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
    dialog.confirm('确定删除？', {
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
