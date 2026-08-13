<template>
  <div class="relative">
    <s-swiper v-model="current">
      <s-swiper-item v-for="(item, index) in list" :key="index">
        <div
          class="flex justify-center items-center text-white w-full h-full text-2xl"
          :style="{ background: item.color }"
        >
          {{ item.text }}
        </div>
      </s-swiper-item>
    </s-swiper>
    <div
      class="absolute right-3 bottom-3 flex justify-center items-center w-8 h-5 rounded-full bg-black/25 text-xs text-white"
    >
      {{ current + 1 }}/{{ list.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  { color: 'var(--s-color-danger)', text: '1' },
  { color: 'var(--s-color-success)', text: '2' },
  { color: 'var(--s-color-primary)', text: '3' },
])

const current = ref(0)
</script>
