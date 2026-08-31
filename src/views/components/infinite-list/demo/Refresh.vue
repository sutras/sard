<template>
  <s-infinite-list
    ref="infiniteList"
    :request="request"
    refreshable
    style="height: 240px; overflow-y: auto; border: 1px var(--s-border-color) solid"
  >
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
  </s-infinite-list>

  <s-button class="mt-4" @click="onClick">点击刷新</s-button>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { ref, useTemplateRef } from 'vue'

const listData = ref<{ code: string; name: string }[]>([])

const request = async (page: number, isRefresh: boolean) => {
  return getProvinces({ page }).then(({ list, total }) => {
    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}

// ============================ 刷新 ============================
const infiniteListRef = useTemplateRef('infiniteList')

const onClick = () => {
  infiniteListRef.value?.refresh()
}
</script>
