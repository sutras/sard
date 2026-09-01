<template>
  <div
    class="overflow-y-auto rounded-lg"
    style="height: 300px; border: 1px solid var(--s-border-color)"
  >
    <s-pull-down-refresh
      :loading="refreshing"
      :disabled="status === LoadMoreStatus.LOADING"
      @refresh="onRefresh"
    >
      <s-list inlaid>
        <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
      </s-list>
      <s-load-more :status="status" @load="getData" />
    </s-pull-down-refresh>
  </div>
</template>

<script setup lang="ts">
import { toast, LoadMoreStatus } from 'sard'
import { ref } from 'vue'
import { getProvinces } from '@/api'

const listData = ref<{ code: string; name: string }[]>([])

// ============================ 加载更多 ============================
const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async () => {
  // 加载中
  status.value = LoadMoreStatus.LOADING
  return getProvinces({ page })
    .then(({ list, total }) => {
      listData.value = page === 1 ? list : [...listData.value, ...list]

      if (listData.value.length >= total || list.length === 0) {
        // 已加载所有数据
        status.value = LoadMoreStatus.COMPLETE
      } else {
        // 还可以继续加载数据
        status.value = LoadMoreStatus.INCOMPLETE
        // 再次请求会加载下一页数据
        page++
      }
    })
    .catch(() => {
      // 加载失败
      status.value = LoadMoreStatus.ERROR
    })
}

// ============================ 下拉刷新 ============================
const refreshing = ref(false)

const onRefresh = () => {
  page = 1
  refreshing.value = true
  getData()
    .then(() => {
      toast('刷新成功')
    })
    .finally(() => {
      refreshing.value = false
    })
}
</script>
