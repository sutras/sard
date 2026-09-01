<template>
  <div
    ref="scroll"
    class="overflow-y-auto rounded-lg"
    style="height: 300px; border: 1px solid var(--s-border-color)"
  >
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
    <s-load-more :status="status" @load="getData" />
  </div>
</template>

<script setup lang="ts">
import { LoadMoreStatus } from 'sard'
import { ref } from 'vue'
import { getProvinces } from '@/api'

const listData = ref<{ code: string; name: string }[]>([])

const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async () => {
  // 加载中
  status.value = LoadMoreStatus.LOADING
  return getProvinces({ page })
    .then(({ list, total }) => {
      listData.value = [...listData.value, ...list]

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
</script>
