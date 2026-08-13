<template>
  <doc-page title="基础使用">
    <s-waterfall class="mx-4" @load="onLoad">
      <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
        <SimulatedImage :meta="item.img" @load="onLoad" />
        <div class="mt-2">{{ item.title }}</div>
      </s-waterfall-item>
    </s-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { random, toast } from 'sard'
import { nextTick, onMounted, ref } from 'vue'
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

const onLoad = () => {
  toast.hide()
}

onMounted(async () => {
  nextTick(() => {
    toast.loading('加载中')
  })
  list.value.push(...(await getData()))
})
</script>
