<template>
  <doc-page title="真实案例">
    <s-waterfall class="mx-4" @load="onLoad">
      <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
        <img mode="widthFix" class="flex w-full" :src="item.url" @load="onLoad" @error="onLoad" />
        <div class="mt-2 text-base">{{ item.title }}</div>
      </s-waterfall-item>
    </s-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { longText } from '@/data/text'
import { random, shuffle, toast } from 'sard'
import { nextTick, onMounted, ref } from 'vue'

interface ListItem {
  title: string
  url: string
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(20)
      .fill(0)
      .map((_, i) => {
        const min = 20
        const max = 50
        const startIndex = random(0, longText.length - max)
        const length = random(min, max)
        return {
          title: longText.slice(startIndex, startIndex + length),
          url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/cat${(i % 12) + 1}.jpg`,
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
  list.value.push(...shuffle(await getData()))
})
</script>
