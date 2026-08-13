<template>
  <div>当前 anchor: {{ current }}</div>

  <s-button style="margin: 5px 0" @click="current = '120100'">设置当前 anchor 为: 120100</s-button>

  <only-child @update="scrollRef = $event">
    <s-scroll-spy
      ref="scrollSpyRef"
      v-model="current"
      style="height: 200px; border: 1px solid var(--s-border-color)"
    >
      <template v-for="item in listData" :key="item.code">
        <s-scroll-spy-anchor :name="item.code" />
        <div class="sticky top-0 p-1 bg-(--s-bg-color-container)">{{ item.code }}</div>
        <div class="flex justify-center items-center h-20 m-2 bg-(--s-fill-color-secondary)">
          {{ item.name }}
        </div>
      </template>

      <div ref="load-more">
        <s-load-more :status="status" @load-more="onLoadMore" @reload="onReload" />
      </div>
    </s-scroll-spy>
  </only-child>
</template>

<script setup lang="ts">
import { useLoadMore, OnlyChild } from 'sard'
import { nextTick, ref, shallowRef, useTemplateRef } from 'vue'
import { getCities } from '@/api'

const current = ref('110000')

const listData = ref<{ code: string; name: string }[]>([])

const scrollSpyRef = useTemplateRef('scrollSpyRef')

const scrollRef = shallowRef<HTMLElement | null>(null)
const loadMoreRef = useTemplateRef('load-more')

const { status, onLoadMore, onReload } = useLoadMore({
  root: scrollRef,
  target: loadMoreRef,
  request: async (page) => {
    return getCities({ page }).then(({ list, total }) => {
      listData.value = [...listData.value, ...list]
      nextTick(() => {
        scrollSpyRef.value?.update()
      })
      return listData.value.length >= total || list.length === 0
    })
  },
})
</script>
