<template>
  <s-infinite-list
    :request="request"
    style="height: 240px; overflow-y: auto; border: 1px var(--s-border-color) solid"
  >
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
  </s-infinite-list>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { ref } from 'vue'

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
</script>
