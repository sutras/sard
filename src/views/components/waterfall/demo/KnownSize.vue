<template>
  <doc-page title="已知宽高">
    <s-waterfall class="mx-4">
      <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
        <s-waterfall-load :width="item.img.width" :height="item.img.height" @load="onLoad">
          <SimulatedImage class="w-full h-full pt-0" :meta="item.img" />
        </s-waterfall-load>
        <div class="mt-2">{{ item.title }}</div>
      </s-waterfall-item>
    </s-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { random } from 'sard'
import { onMounted, ref } from 'vue'
import SimulatedImage from './SimulatedImage.vue'
import { longText } from '@/data/text'

interface ListItem {
  title: string
  img: {
    width: number
    height: number
  }
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(20)
      .fill(0)
      .map(() => {
        const min = 20
        const max = 50
        const startIndex = random(0, longText.length - max)
        const length = random(min, max)
        return {
          title: longText.slice(startIndex, startIndex + length),
          img: {
            width: random(100, 500),
            height: random(100, 500),
          },
        }
      })
    resolve(data)
  })
}

onMounted(async () => {
  list.value.push(...(await getData()))
})
</script>
