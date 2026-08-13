<template>
  <doc-page title="自定义列数">
    <div class="mx-4">
      <s-slider v-model="columns" class="7" show-scale :min="1" :max="8" />
      <s-waterfall class="mt-4" :columns="columns" :column-gap="4" :row-gap="4" @load="onLoad">
        <s-waterfall-item v-for="(item, index) in list" :key="index" #default="{ onLoad }">
          <img mode="widthFix" class="flex w-full" :src="item.url" @load="onLoad" @error="onLoad" />
        </s-waterfall-item>
      </s-waterfall>
    </div>
  </doc-page>
</template>

<script setup lang="ts">
import { shuffle, toast } from 'sard'
import { nextTick, onMounted, ref } from 'vue'

const columns = ref(3)

interface ListItem {
  url: string
}

const list = ref<ListItem[]>([])

const getData = () => {
  return new Promise<ListItem[]>((resolve) => {
    const data = Array(30)
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
