<template>
  <div>当前 anchor: {{ value }}</div>

  <s-button style="margin: 5px 0" @click="value = '120100'">设置当前 anchor 为: 120100</s-button>

  <s-scroll-spy v-model="value" style="height: 200px; border: 1px solid var(--s-border-color)">
    <template v-for="item in listData" :key="item.code">
      <s-scroll-spy-anchor :name="item.code" />
      <div class="sticky top-0 p-1 bg-(--s-bg-color-container)">{{ item.code }}</div>
      <div class="flex justify-center items-center h-20 m-2 bg-(--s-fill-color-secondary)">
        {{ item.name }}
      </div>
    </template>

    <s-load-more :status="status" @load="getData" />
  </s-scroll-spy>
</template>

<script setup lang="ts">
import { LoadMoreStatus } from 'sard'
import { ref } from 'vue'
import { getCities } from '@/api'

const value = ref('110000')

const listData = ref<{ code: string; name: string }[]>([])

const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async () => {
  status.value = LoadMoreStatus.LOADING
  return getCities({ page })
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
</script>
