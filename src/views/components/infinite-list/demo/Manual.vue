<template>
  <s-infinite-list
    v-model:status="status"
    style="height: 240px; overflow-y: auto; border: 1px var(--s-border-color) solid"
    @load="onLoad"
  >
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
  </s-infinite-list>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { LoadMoreStatus } from 'sard'
import { ref } from 'vue'

const listData = ref<{ code: string; name: string }[]>([])

const status = ref(LoadMoreStatus.INCOMPLETE)

let page = 1

const onLoad = () => {
  return getProvinces({ page }).then(({ list, total }) => {
    if (page === 1) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    if (listData.value.length >= total || list.length === 0) {
      status.value = LoadMoreStatus.COMPLETE
    }
  })
}
</script>
