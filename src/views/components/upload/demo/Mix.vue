<template>
  <s-upload
    v-model="fileList"
    :media-type="['image', 'video']"
    :after-read="afterRead"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import type { UploadFileItem } from 'sard'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
])

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
