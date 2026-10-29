<template>
  <div class="mb-1 text-sm">
    当前锚点：{{ currentName }}
    <span v-if="value">（{{ value }}）</span>
  </div>

  <s-button v-if="target" class="my-3" @click="value = target.code">
    跳到：{{ labelOf(target.code) }}
  </s-button>

  <s-scroll-spy
    v-model="value"
    style="height: 200px; border: 1px solid var(--s-border-color)"
    class="rounded-lg"
  >
    <template v-for="item in listData" :key="item.code">
      <s-scroll-spy-anchor :name="item.code" />
      <div class="sticky top-0 flex items-baseline gap-2 p-1 bg-(--s-bg-color-container)">
        <span>{{ labelOf(item.code) }}</span>
        <span class="text-xs text-(--s-text-color-tertiary)">{{ item.code }}</span>
      </div>
      <div
        class="flex justify-center items-center h-20 m-2 text-sm text-(--s-text-color-tertiary) bg-(--s-fill-color-secondary)"
      >
        {{ item.name }} · 看板
      </div>
    </template>

    <s-load-more :status="status" @load="getData" />
  </s-scroll-spy>
</template>

<script setup lang="ts">
import { LoadMoreStatus } from 'sard'
import { computed, ref } from 'vue'
import { getWorkshops } from '@/api'
import { plantNamePath } from '@/data/plant-tree'

const labelOf = (code: string) => plantNamePath(Number(code))

const value = ref('')

const listData = ref<{ code: string; name: string }[]>([])

const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

const currentName = computed(() => (value.value ? labelOf(value.value) : '—'))

const target = computed(() => listData.value[4])

let page = 1

const getData = async () => {
  status.value = LoadMoreStatus.LOADING
  return getWorkshops({ page })
    .then(({ list, total }) => {
      listData.value = page === 1 ? list : [...listData.value, ...list]

      if (!value.value) {
        value.value = listData.value[0]?.code ?? ''
      }

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
