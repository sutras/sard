<template>
  <s-swiper auto-height show-indicator>
    <s-swiper-item v-for="(item, index) in list" :key="index">
      <div
        class="flex justify-center items-center text-white w-full text-2xl"
        :style="{
          background: item.color,
          height: item.height,
        }"
      >
        {{ item.text }}
      </div>
    </s-swiper-item>
  </s-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  { color: 'var(--s-color-danger)', text: '短内容', height: '150px' },
  { color: 'var(--s-color-success)', text: '较高的内容\n第二行文字', height: '250px' },
  { color: 'var(--s-color-primary)', text: '中等内容', height: '180px' },
])
</script>
