<template>
  <!-- 工业语境：点检照片与报告上传｜Mix 用法演示 -->
  <s-upload
    v-model="fileList"
    :media-type="['image', 'video']"
    :after-read="afterRead"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import industrialCncVideo from '@/assets/videos/industrial-cnc.mp4'
import { firstArticlePhoto } from '@/data/industrial-images'
import type { UploadFileItem } from 'sard'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: industrialCncVideo,
  },
  {
    url: firstArticlePhoto,
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
