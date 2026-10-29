<template>
  <s-swiper
    :slides-per-view="3"
    :slides-per-group="2"
    :space-between="20"
    show-indicator
    centered-slides
  >
    <s-swiper-item v-for="(item, index) in list" :key="index">
      <div
        class="flex justify-center items-center text-white w-full h-full text-2xl"
        :style="{ background: item.color }"
      >
        {{ item.text }}
      </div>
    </s-swiper-item>
  </s-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  { color: '#3b82f6', text: '1' },
  { color: '#6366f1', text: '2' },
  { color: '#a855f7', text: '3' },
  { color: '#ec4899', text: '4' },
  { color: '#ef4444', text: '5' },
  { color: '#f97316', text: '6' },
  { color: '#eab308', text: '7' },
  { color: '#22c55e', text: '8' },
  { color: '#14b8a6', text: '9' },
])
</script>
