<template>
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
import { previewImage } from 'sard'

const urls = [
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat2.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat3.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat4.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat5.jpg',
  'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat6.jpg',
]

const onClick = (index: number) => {
  previewImage({
    urls,
    current: index,
  })
}
</script>
