<template>
  <doc-page title="最大等待时间">
    <s-waterfall class="mx-4" @load="onLoad">
      <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
        <s-waterfall-load
          :width="100"
          :height="100"
          :max-wait="150"
          @load="onLoad"
          #default="{ onLoad, overtime }"
        >
          <img
            class="flex w-full h-full object-cover"
            :src="item.url"
            @load="onLoad"
            @error="onLoad"
          />
          <s-tag
            v-if="overtime"
            color="danger"
            mark="right"
            variant="solid"
            class="absolute top-0 left-0"
          >
            超时
          </s-tag>
        </s-waterfall-load>
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
