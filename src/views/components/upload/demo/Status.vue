<template>
  <s-upload v-model="fileList" :after-read="afterRead" />
</template>

<script setup lang="ts">
import { firstArticlePhoto, inspectionPhoto, nameplatePhoto } from '@/data/industrial-images'
import type { UploadFileItem } from 'sard'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: inspectionPhoto,
  },
  {
    url: firstArticlePhoto,
    status: 'uploading',
    message: '正在上传',
  },
  {
    url: nameplatePhoto,
    status: 'failed',
    message: '上传未完成',
  },
])

const afterRead = (fileItem: UploadFileItem) => {
  console.log(fileItem)
  fileItem.status = 'uploading'
  fileItem.message = '正在上传'

  setTimeout(() => {
    fileItem.status = 'done'
  }, 1500)
}
</script>
