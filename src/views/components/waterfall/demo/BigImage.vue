<template>
  <doc-page title="大图">
    <s-waterfall :column-gap="4" :row-gap="4" @load="onLoad">
      <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
        <img mode="widthFix" class="flex w-full" :src="item.url" @load="onLoad" @error="onLoad" />
      </s-waterfall-item>
    </s-waterfall>
  </doc-page>
</template>

<script setup lang="ts">
import { shuffle, toast } from 'sard'
import { nextTick, onMounted, ref } from 'vue'

interface ListItem {
  url: string
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(19)
      .fill(0)
      .map((_, i) => {
        return {
          url: `https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger${(i % 12) + 1}.jpg`,
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
