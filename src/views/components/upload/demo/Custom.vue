<template>
  <!-- 工业语境：点检照片与报告上传｜Custom 用法演示 -->
  <s-upload
    v-model="fileList"
    :after-read="afterRead"
    #default="{ list, onSelect, onRemove, onImageClick }"
  >
    <s-list card>
      <s-list-item title="上传点检照片 / 报告" arrow hover @click="onSelect" #icon>
        <Plus />
      </s-list-item>
      <s-list-item v-for="(item, index) in list" :key="index">
        <div class="flex items-center">
          <img
            mode="aspectFill"
            :src="item.url || fileToUrl(item.file)"
            style="width: 32px; height: 32px"
            class="flex-none"
            @click="onImageClick(index)"
          />
          <span class="ms-3 truncate">{{ item.name }}</span>
          <div class="flex items-center ms-auto">
            <s-loading v-if="item.status === 'uploading'" />
            <XCircle v-else-if="item.status === 'failed'" class="text-(--s-color-danger)" />
            <Success v-else-if="item.status === 'done'" class="text-(--s-color-success)" />
          </div>
          <s-button variant="link" size="small" color="danger" @click="onRemove(index, item)" #icon>
            <Trash />
          </s-button>
        </div>
      </s-list-item>
    </s-list>
  </s-upload>
</template>

<script setup lang="ts">
import { firstArticlePhoto, inspectionPhoto, nameplatePhoto } from '@/data/industrial-images'
import { Plus, Success, Trash, XCircle } from '@sard/icons'
import type { UploadFileItem } from 'sard'
import { ref } from 'vue'

const fileToUrl = (file?: File) => {
  return file ? URL.createObjectURL(file) : ''
}

const fileList = ref<UploadFileItem[]>([
  {
    url: inspectionPhoto,
    name: 'EQ-2023-204_安全门联锁.jpg',
    status: 'done',
  },
  {
    url: firstArticlePhoto,
    name: '首件检验记录_L20241027-B01.jpg',
    status: 'uploading',
    message: '正在上传',
  },
  {
    url: nameplatePhoto,
    name: '设备铭牌_EQ-2024-017.jpg',
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
