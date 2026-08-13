<template>
  <s-button @click="onClick">选择图片</s-button>

  <s-image
    :src="url"
    mode="aspectFit"
    style="display: block; width: 160px; height: 160px; margin-top: 10px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { chooseFile, cropImage } from 'sard'

const url = ref('')

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
