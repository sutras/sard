<template>
  <s-list card>
    <s-list-item style="padding: 0">
      <s-swipe-action :disabled="loading">
        <s-list-item title="右边插槽" value="内容" />
        <template #right="{ hide }">
          <s-button color="danger" square :loading="loading" auto-height @click="onDelete(hide)">
            删除
          </s-button>
          <s-button color="primary" square auto-height @click="hide">取消</s-button>
        </template>
      </s-swipe-action>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard'
import { ref } from 'vue'

const asyncFetch = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const loading = ref(false)

const onDelete = (hide: () => void) => {
  dialog.confirm('确定删除？', {
    onConfirm() {
      loading.value = true
      asyncFetch()
        .then(() => {
          hide()
        })
        .finally(() => {
          loading.value = false
        })
    },
  })
}
</script>
