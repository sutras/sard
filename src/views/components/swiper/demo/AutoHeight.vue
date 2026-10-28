<template>
  <!-- 工业语境：车间看板轮播｜AutoHeight 用法演示 -->
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
  { color: 'var(--s-color-danger)', text: '短参数明细', height: '150px' },
  { color: 'var(--s-color-success)', text: '较高的参数明细\n第二行文字', height: '250px' },
  { color: 'var(--s-color-primary)', text: '中等参数明细', height: '180px' },
])
</script>
