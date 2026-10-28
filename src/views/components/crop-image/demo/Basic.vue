<template>
  <!-- 工业语境：报警现场照片裁剪后归档｜Basic 用法演示 -->
  <s-button @click="onClick">选择报警照片</s-button>

  <s-image
    :src="url"
    mode="aspectFit"
    style="display: block; width: 160px; height: 160px; margin-top: 10px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { chooseFile, cropImage } from 'sard'
import { injectionAlarmPhoto } from '@/data/industrial-images'

const url = ref(injectionAlarmPhoto)

const onClick = () => {
  chooseFile().then((files) => {
    cropImage({
      url: URL.createObjectURL(files[0]),
      success(dataURL) {
        url.value = dataURL
      },
    })
  })
}
</script>
