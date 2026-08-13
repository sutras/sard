<template>
  <s-swiper show-indicator style="height: 200px">
    <s-swiper-item v-for="(item, index) in list" :key="index">
      <div
        class="flex flex-col justify-center items-center text-white w-full h-full text-2xl"
        :style="{ background: item.color }"
      >
        <p>{{ item.text }}</p>
        <s-swiper show-indicator style="width: 80%; height: 100px; margin: 10px 0">
          <s-swiper-item v-for="(sub, subIdx) in item.children" :key="subIdx">
            <div
              class="flex justify-center items-center text-white text-sm rounded"
              style="width: 100%; height: 100%"
              :style="{ background: sub.color }"
            >
              {{ sub.text }}
            </div>
          </s-swiper-item>
        </s-swiper>
      </div>
    </s-swiper-item>
  </s-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  {
    color: 'var(--s-color-danger)',
    text: '外层 1',
    children: [
      { color: 'rgba(0,0,0,0.3)', text: '内 1-1' },
      { color: 'rgba(0,0,0,0.5)', text: '内 1-2' },
    ],
  },
  {
    color: 'var(--s-color-success)',
    text: '外层 2',
    children: [
      { color: 'rgba(0,0,0,0.3)', text: '内 2-1' },
      { color: 'rgba(0,0,0,0.5)', text: '内 2-2' },
    ],
  },
  {
    color: 'var(--s-color-primary)',
    text: '外层 3',
    children: [
      { color: 'rgba(0,0,0,0.3)', text: '内 3-1' },
      { color: 'rgba(0,0,0,0.5)', text: '内 3-2' },
    ],
  },
])
</script>
