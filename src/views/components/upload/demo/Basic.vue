<template>
  <s-upload v-model="fileList" :after-read="afterRead" @change="onChange" />
</template>

<script setup lang="ts">
import type { UploadFileItem } from 'sard'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([])

const uploadFile = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })
}

const afterRead = (fileItem: UploadFileItem) => {
  fileItem.status = 'uploading'
  fileItem.message = '正在上传'

  uploadFile()
    .then(() => {
      fileItem.status = 'done'
    })
    .catch(() => {
      fileItem.status = 'failed'
    })
}

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
