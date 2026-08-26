<template>
  <div ref="scroll" :class="bem.b()">
    <PullDownRefresh
      :loading="isRefreshing"
      :disabled="!refreshable || isLoading"
      :done-duration="doneDuration"
      @refresh="onRefresh"
    >
      <template #unready="slotsProps">
        <slot name="unready" v-bind="slotsProps">
          <Loading type="clock" size="16px" :animated="false" :progress="slotsProps.progress">
            {{ t('unready') }}
          </Loading>
        </slot>
      </template>
      <template #ready>
        <slot name="ready">
          <Loading type="clock" size="16px" :animated="false">
            {{ t('ready') }}
          </Loading>
        </slot>
      </template>
      <template #loading>
        <slot name="loading">
          <Loading type="clock" size="16px">
            {{ t('loading') }}
          </Loading>
        </slot>
      </template>
      <template #done>
        <slot name="done">
          {{ doneText }}
        </slot>
      </template>

      <slot :status="status" :refresh="refresh"></slot>

      <div ref="load-more" :class="[bem.e('load-more'), bem.is('hidden', hideLoadMore)]">
        <LoadMore :status="status" @load-more="onLoadMore" @reload="onReload" />
      </div>
    </PullDownRefresh>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { createBem } from '../../utils'
import {
  type InfiniteListProps,
  type InfiniteListSlots,
  type InfiniteListEmits,
  type InfiniteListExpose,
  defaultInfiniteListProps,
} from './common'
import PullDownRefresh from '../pull-down-refresh/pull-down-refresh.vue'
import LoadMore from '../load-more/load-more.vue'
import { useLoadMore } from '../load-more/useLoadMore'
import { useTranslateWithPrefix } from '../../locale'
import Loading from '../loading/loading.vue'
import { useScrollParent } from '../../use/useScrollParent'

const props = withDefaults(defineProps<InfiniteListProps>(), defaultInfiniteListProps)

defineSlots<InfiniteListSlots>()

const emit = defineEmits<InfiniteListEmits>()

const bem = createBem('infinite-list')

const { t } = useTranslateWithPrefix('pullDownRefresh')

// ============================ 下拉刷新 ============================
const doneText = ref('')

const onRefresh = () => {
  refresh()
    .then(() => {
      doneText.value = t('doneSuccess')
      emit('refresh-success')
    })
    .catch(() => {
      doneText.value = t('doneFail')
      emit('refresh-error')
    })
}

// ============================ 加载更多 ============================
const scrollRef = useTemplateRef('scroll')
const scrollParent = useScrollParent(scrollRef)
const loadMoreRef = useTemplateRef('load-more')

const { status, isLoading, isRefreshing, onLoadMore, onReload, refresh } = useLoadMore({
  root: scrollParent,
  target: loadMoreRef,
  rootMargin: () => props.rootMargin,
  request: async (page, isRefresh) => {
    return props.request(page, isRefresh)
  },
})

defineExpose<InfiniteListExpose>({
  refresh,
})
</script>
