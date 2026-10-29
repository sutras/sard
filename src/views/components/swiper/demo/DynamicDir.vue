<template>
  <s-list card>
    <s-list-item>
      <s-segmented v-model="vertical" :options="options" />
    </s-list-item>
  </s-list>

  <s-swiper :vertical="vertical" show-indicator style="height: 140px">
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

const vertical = ref(false)

const options = [
  { label: '横向', value: false },
  { label: '纵向', value: true },
]

const list = ref([
  { color: 'var(--s-color-danger)', text: '报警' },
  { color: 'var(--s-color-success)', text: '运行' },
  { color: 'var(--s-color-primary)', text: '待机' },
])
</script>
