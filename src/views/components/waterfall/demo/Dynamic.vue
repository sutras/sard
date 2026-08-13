<template>
  <doc-page title="结合下拉刷新与触底加载">
    <s-pull-down-refresh
      ref="pullDownRefresh"
      :loading="isRefreshing"
      :disabled="isLoading"
      @refresh="onRefresh"
    >
      <s-waterfall ref="waterfallRef" class="mx-4" :column-gap="4" :row-gap="4">
        <s-waterfall-item v-for="item in listData" :key="item.id" #default="{ onLoad }">
          <img mode="widthFix" class="flex w-full" :src="item.url" @load="onLoad" @error="onLoad" />
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

      <div ref="load-more">
        <s-load-more :status="status" @load-more="onLoadMore" @reload="onReload" />
      </div>
    </s-pull-down-refresh>
  </doc-page>
</template>

<script setup lang="ts">
import { getImages } from '@/api'
import { usePageScroll, shuffle, sleep, toast, useLoadMore } from 'sard'
import { ref, useTemplateRef } from 'vue'

interface ListItem {
  id: number
  url: string
}

const listData = ref<ListItem[]>([])

// 下拉刷新
const pullDownRefresh = ref()

usePageScroll(() => {
  pullDownRefresh.value?.enableToRefresh(window.scrollY === 0)
})

const onRefresh = () => {
  refresh().then(() => {
    toast('刷新成功')
  })
}

// 加载更多
const loadMoreRef = useTemplateRef('load-more')

const { status, isLoading, isRefreshing, onLoadMore, onReload, refresh } = useLoadMore({
  target: loadMoreRef,
  request: async (page, isRefresh) => {
    return getImages({ page }).then(({ list, total }) => {
      if (isRefresh) {
        listData.value = [...list]
      } else {
        listData.value = [...listData.value, ...list]
      }
      return listData.value.length >= total || list.length === 0
    })
  },
})

// 删除
const onDelete = (item: ListItem) => {
  listData.value.splice(listData.value.indexOf(item), 1)
}
</script>
