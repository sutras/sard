<template>
  <div class="relative">
    <s-swiper v-model="current">
      <s-swiper-item v-for="(item, index) in list" :key="index">
        <div
          class="flex justify-center items-center text-white w-full h-full"
          :style="{ background: item.color }"
        >
          {{ item.text }}

          <div
            class="absolute bottom-0 inset-x-0 px-2 py-1.5 text-white truncate text-sm bg-black/25"
          >
            {{ item.title }}
          </div>
        </div>
      </s-swiper-item>
    </s-swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)

const list = ref([
  {
    color: 'var(--s-color-danger)',
    text: '1',
    title: '老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。',
  },
  {
    color: 'var(--s-color-success)',
    text: '2',
    title: '为报倾城随太守，亲射虎，看孙郎。',
  },
  {
    color: 'var(--s-color-primary)',
    text: '3',
    title: '酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。',
  },
])
</script>
