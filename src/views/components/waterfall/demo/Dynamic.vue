<template>
  <doc-page title="结合下拉刷新与触底加载">
    <s-pull-down-refresh
      :loading="refreshing"
      :disabled="status === LoadMoreStatus.LOADING"
      @refresh="onRefresh"
    >
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
      <s-load-more :status="status" @load="getData" />
    </s-pull-down-refresh>
  </doc-page>
</template>

<script setup lang="ts">
import { getImages } from '@/api'
import { LoadMoreStatus } from 'sard'
import { ref } from 'vue'

interface ListItem {
  id: number
  url: string
}

const listData = ref<ListItem[]>([])

// 删除
const onDelete = (item: ListItem) => {
  listData.value.splice(listData.value.indexOf(item), 1)
}

// ============================ 加载更多 ============================
const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async () => {
  status.value = LoadMoreStatus.LOADING
  return getImages({ page })
    .then(({ list, total }) => {
      listData.value = page === 1 ? list : [...listData.value, ...list]

      if (listData.value.length >= total || list.length === 0) {
        status.value = LoadMoreStatus.COMPLETE
      } else {
        status.value = LoadMoreStatus.INCOMPLETE
        page++
      }
    })
    .catch(() => {
      status.value = LoadMoreStatus.ERROR
    })
}

// ============================ 下拉刷新 ============================
const refreshing = ref(false)

const onRefresh = () => {
  page = 1
  refreshing.value = true
  getData().finally(() => {
    refreshing.value = false
  })
}
</script>
