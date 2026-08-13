<template>
  <s-swiper v-model="current" show-indicator>
    <s-swiper-item v-for="(item, index) in list" :key="index">
      <img
        v-if="item.image"
        :src="item.image"
        draggable="false"
        class="w-full h-full object-cover"
      />
      <video-slide
        v-else-if="item.video"
        :url="item.video"
        :poster="item.video"
        :active="current === index"
      />
    </s-swiper-item>
  </s-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoSlide from './VideoSlide.vue'

const list = ref([
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
  {
    video: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
    poster: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
  },
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
  },
])

const current = ref(0)
</script>
