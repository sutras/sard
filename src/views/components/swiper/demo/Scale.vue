<template>
  <s-swiper v-model="current" :slides-per-view="2" centered-slides>
    <s-swiper-item v-for="(item, index) in list" :key="index">
      <div
        class="flex justify-center items-center text-white w-full h-full text-2xl"
        :style="[{ background: item.color }, dynamicItemStyle(index, current)]"
      >
        {{ item.text }}
      </div>
    </s-swiper-item>
  </s-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicItemStyle = (index: number, activeIndex: number) => {
  return {
    transform: index === activeIndex ? 'scale(1)' : 'scale(0.8)',
    transition: 'transform 0.3s',
    borderRadius: '8px',
    overflow: 'hidden',
  }
}

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
  { color: '#06b6d4', text: '10' },
])

const current = ref(0)
</script>
