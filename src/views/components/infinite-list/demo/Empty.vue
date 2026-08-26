<template>
  <p class="mb-4">下拉刷新再次请求数据：</p>

  <s-infinite-list
    :request="request"
    refreshable
    :hide-load-more="listData.length === 0"
    style="height: 240px; border: 1px var(--s-border-color) solid"
  >
    <s-empty v-if="listData.length === 0" class="my-auto" />
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
  </s-infinite-list>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { ref } from 'vue'

const listData = ref<{ code: string; name: string }[]>([])

let time = 0

const request = async (page: number, isRefresh: boolean) => {
  return getProvinces({ page }).then(({ list, total }) => {
    time++
    if (time === 1) {
      listData.value = []
      return true
    }

    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}
</script>
