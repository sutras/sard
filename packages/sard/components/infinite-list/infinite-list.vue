<template>
  <div :class="bem.b()">
    <PullDownRefresh
      v-if="refreshable"
      :loading="refreshing"
      :disabled="status === LoadMoreStatus.LOADING"
      @refresh="onRefresh"
    >
      <slot></slot>
      <LoadMore :status="status" @load="getData" />
    </PullDownRefresh>
    <template>
      <slot></slot>
      <LoadMore :status="status" @load="getData" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import {
  type InfiniteListProps,
  type InfiniteListSlots,
  type InfiniteListEmits,
  type InfiniteListExpose,
  defaultInfiniteListProps,
} from './common'
import LoadMore from '../load-more/load-more.vue'
import { LoadMoreStatus } from '../load-more'
import { ref } from 'vue'
import PullDownRefresh from '../pull-down-refresh/pull-down-refresh.vue'

const props = withDefaults(defineProps<InfiniteListProps>(), defaultInfiniteListProps)

defineSlots<InfiniteListSlots>()

const emit = defineEmits<InfiniteListEmits>()

const bem = createBem('infinite-list')

// ============================ 加载更多 ============================

const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async () => {
  status.value = LoadMoreStatus.LOADING

  return props
    .request(page)
    .then((finish) => {
      if (finish) {
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

// ============================ 下拉刷新 ============================
const refreshing = ref(false)

const onRefresh = () => {
  page = 1
  refreshing.value = true
  getData().finally(() => {
    refreshing.value = false
  })
}

defineExpose<InfiniteListExpose>({})
</script>
