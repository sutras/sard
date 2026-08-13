<template>
  <s-button @click="onClick">选择图片</s-button>

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

const url = ref('')

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
