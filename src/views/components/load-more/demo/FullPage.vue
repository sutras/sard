<template>
  <div>
    <doc-page gray title="页面触底加载">
      <s-list>
        <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
      </s-list>
      <div ref="load-more">
        <s-load-more :status="status" @load-more="onLoadMore" @reload="onReload" />
      </div>
    </doc-page>
  </div>
</template>

<script setup lang="ts">
import { useLoadMore } from 'sard'
import { ref, useTemplateRef } from 'vue'
import { getCities } from '@/api'

const listData = ref<{ code: string; name: string }[]>([])
const loadMoreRef = useTemplateRef('load-more')

const { status, onLoadMore, onReload } = useLoadMore({
  target: loadMoreRef,
  request: async (page) => {
    return getCities({ page }).then(({ list, total }) => {
      listData.value = [...listData.value, ...list]
      return listData.value.length >= total || list.length === 0
    })
  },
})
</script>
