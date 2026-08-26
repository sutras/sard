<template>
  <doc-page title="结合下拉刷新与触底加载">
    <s-infinite-list refreshable :request="loadImages">
      <s-waterfall ref="waterfallRef" class="mx-4" :column-gap="4" :row-gap="4">
        <s-waterfall-item v-for="item in listData" :key="item.id" #default="{ onLoad }">
          <img
            mode="widthFix"
            class="flex w-full"
            draggable="false"
            :src="item.url"
            @load="onLoad"
            @error="onLoad"
          />
          <s-button
            class="absolute! top-2 right-2"
            size="small"
            color="danger"
            @click="onDelete(item)"
          >
            删除
          </s-button>
        </s-waterfall-item>
      </s-waterfall>
    </s-infinite-list>
  </doc-page>
</template>

<script setup lang="ts">
import { getImages } from '@/api'
import { ref } from 'vue'

interface ListItem {
  id: number
  url: string
}

const listData = ref<ListItem[]>([])

const loadImages = async (page: number, isRefresh: boolean) => {
  return getImages({ page }).then(({ list, total }) => {
    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}

// 删除
const onDelete = (item: ListItem) => {
  listData.value.splice(listData.value.indexOf(item), 1)
}
</script>
