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
import industrialCncVideo from '@/assets/videos/industrial-cnc.mp4'
import {
  shopfloorPhoto,
  injectionAlarmPhoto,
  agvPhoto,
  cncLathePhoto,
} from '@/data/industrial-images'
import { ref } from 'vue'
import VideoSlide from './VideoSlide.vue'

const list = ref([
  {
    image: shopfloorPhoto,
  },
  {
    video: industrialCncVideo,
    poster: cncLathePhoto,
  },
  {
    image: agvPhoto,
  },
])

const current = ref(0)
</script>
