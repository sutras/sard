<template>
  <s-card>
    <s-segmented v-model="columns" :options="columnOptions" />

    <div class="mt-3.5 grid gap-2" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="(name, index) in goodsList" :key="name" class="min-w-0 text-[13px] leading-snug">
        <img
          class="block aspect-4/3 w-full rounded-lg bg-(--s-fill-color) object-cover"
          :src="goodsPhotos[index]"
          alt=""
        />
        <div class="mt-1.5 text-(--s-text-color-primary)">
          <s-text-shrink v-if="index === 0" ref="first" :text="name" :max-lines="1" />
          <s-text-shrink v-else :text="name" :max-lines="1" />
        </div>
      </div>
    </div>

    <s-text tag="div" size="small" color="tertiary" class="mt-3.5 tabular-nums">
      {{ columns }} 列 · 当前 {{ sizeText }}
    </s-text>
  </s-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { galleryPhotos } from '@/data/industrial-images'
import { goodsList } from './shared'

const columnOptions = [
  { label: '2 列', value: 2 },
  { label: '3 列', value: 3 },
]

const goodsPhotos = goodsList.map((_, index) => galleryPhotos[index].url)

const columns = ref(2)

const first = useTemplateRef<Array<{ fontSize?: number }>>('first')

const sizeText = computed(() => {
  const fontSize = first.value?.[0]?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>
