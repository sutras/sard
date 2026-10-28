<template>
  <!-- 工业语境：报警现场照片裁剪后归档｜BeforeCrop 用法演示 -->
  <s-button @click="onClick">选择报警照片</s-button>

  <s-image
    :src="url"
    mode="aspectFit"
    :style="{
      display: 'block',
      width: width + 'px',
      height: height + 'px',
      marginTop: '10px',
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { chooseFile, cropImage } from 'sard'
import { injectionAlarmPhoto } from '@/data/industrial-images'

const url = ref(injectionAlarmPhoto)

const width = ref(0)
const height = ref(0)

const onClick = () => {
  chooseFile().then((files) => {
    cropImage({
      url: URL.createObjectURL(files[0]),
      beforeCrop() {
        return 0.3
      },
      success(dataURL, info) {
        url.value = dataURL
        width.value = info.width
        height.value = info.height
      },
    })
  })
}
</script>
