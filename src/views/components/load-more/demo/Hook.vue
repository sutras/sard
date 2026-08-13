<template>
  <div
    ref="scroll"
    class="overflow-y-auto rounded-lg"
    style="height: 300px; border: 1px solid var(--s-border-color)"
  >
    <s-list inlaid>
      <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
    </s-list>
    <div ref="load-more">
      <s-load-more :status="status" @load-more="onLoadMore" @reload="onReload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadMore } from 'sard'
import { ref, useTemplateRef } from 'vue'
import { getCities } from '@/api'

const listData = ref<{ code: string; name: string }[]>([])

const scrollRef = useTemplateRef('scroll')
const loadMoreRef = useTemplateRef('load-more')

const { status, onLoadMore, onReload } = useLoadMore({
  root: scrollRef,
  target: loadMoreRef,
  request: async (page) => {
    return getCities({ page }).then(({ list, total }) => {
      listData.value = [...listData.value, ...list]
      return listData.value.length >= total || list.length === 0
    })
  },
})
</script>
