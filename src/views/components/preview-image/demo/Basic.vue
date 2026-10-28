<template>
  <!-- 工业语境：报警现场大图查看｜Basic 用法演示 -->
  <s-grid :columns="3" square :gap="8">
    <s-grid-item v-for="(url, index) in urls" :key="url">
      <s-image
        :src="url"
        width="100%"
        height="100%"
        radius="8px"
        class="flex!"
        @click="onClick(index)"
      />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { galleryPhotos } from '@/data/industrial-images'
import { previewImage } from 'sard'

const urls = galleryPhotos.slice(0, 6).map((item) => item.url)

const onClick = (index: number) => {
  previewImage({
    urls,
    current: index,
  })
}
</script>
