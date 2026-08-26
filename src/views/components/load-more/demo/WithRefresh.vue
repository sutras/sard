<template>
  <div
    ref="scroll"
    class="overflow-y-auto rounded-lg"
    style="height: 300px; border: 1px solid var(--s-border-color)"
  >
    <s-pull-down-refresh :loading="isRefreshing" :disabled="isLoading" @refresh="onRefresh">
      <s-list inlaid>
        <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
      </s-list>
      <div ref="load-more">
        <s-load-more :status="status" @load-more="onLoadMore" @reload="onReload" />
      </div>
    </s-pull-down-refresh>
  </div>
</template>

<script setup lang="ts">
import { toast, useLoadMore } from 'sard'
import { ref, useTemplateRef } from 'vue'
import { getCities } from '@/api'

const listData = ref<{ code: string; name: string }[]>([])

// 下拉刷新
const onRefresh = () => {
  refresh().then(() => {
    toast('刷新成功')
  })
}

// 加载更多
const scrollRef = useTemplateRef('scroll')
const loadMoreRef = useTemplateRef('load-more')

const { status, isLoading, isRefreshing, onLoadMore, onReload, refresh } = useLoadMore({
  root: scrollRef,
  target: loadMoreRef,
  request: async (page, isRefresh) => {
    return getCities({ page }).then(({ list, total }) => {
      if (isRefresh) {
        listData.value = [...list]
      } else {
        listData.value = [...listData.value, ...list]
      }
      return listData.value.length >= total || list.length === 0
    })
  },
})
</script>
