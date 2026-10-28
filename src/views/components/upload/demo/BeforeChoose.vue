<template>
  <!-- 工业语境：点检照片与报告上传｜BeforeChoose 用法演示 -->
  <s-upload :before-choose="beforeChoose" />
</template>

<script setup lang="ts">
import { actionSheet, toast, type UploadProps } from 'sard'

const beforeChoose: UploadProps['beforeChoose'] = (fileList, next) => {
  actionSheet({
    itemList: [
      { label: '拍摄', value: 0 },
      { label: '从相册选择', value: 1 },
    ],
    onSelect(item) {
      if (item.value === 0) {
        next({
          capture: 'environment',
        })
      } else if (item.value === 1) {
        next(true)
      }
    },
    onClose() {
      next(false)
    },
  })
}
</script>
