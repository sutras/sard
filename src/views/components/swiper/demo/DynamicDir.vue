<template>
  <s-swiper show-indicator>
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
  { color: 'var(--s-color-danger)', text: '1' },
  { color: 'var(--s-color-success)', text: '2' },
  { color: 'var(--s-color-primary)', text: '3' },
])
</script>
