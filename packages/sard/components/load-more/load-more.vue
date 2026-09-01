<template>
  <div ref="loadMore" :class="loadMoreClass" @click="onClick">
    <slot v-if="status === 'incomplete'" name="incomplete">
      {{ incompleteText || t('incompleteText') }}
    </slot>
    <slot v-else-if="status === 'loading'" name="loading">
      <Loading>
        {{ loadingText || t('loadingText') }}
      </Loading>
    </slot>
    <slot v-else-if="status === 'complete'" name="complete">
      {{ completeText || t('completeText') }}
    </slot>
    <slot v-else-if="status === 'error'" name="error">
      {{ errorText || t('errorText') }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type LoadMoreProps,
  type LoadMoreSlots,
  type LoadMoreEmits,
  defaultLoadMoreProps,
  LoadMoreStatus,
} from './common'
import { useTranslateWithPrefix } from '../../locale'
import Loading from '../loading/loading.vue'
import { useIntersectionObserver } from '../../use'
import { useScrollParent } from '../../use/useScrollParent'

const props = withDefaults(defineProps<LoadMoreProps>(), defaultLoadMoreProps)

defineSlots<LoadMoreSlots>()

const emit = defineEmits<LoadMoreEmits>()

const bem = createBem('load-more')

const { t } = useTranslateWithPrefix('loadMore')

const loadMoreRef = useTemplateRef('loadMore')

const scrollParent = useScrollParent(loadMoreRef)

const onClick = () => {
  if (props.status === 'incomplete') {
    emit('load')
  } else if (props.status === 'error') {
    emit('load')
  }
}

const { isIntersecting } = useIntersectionObserver({
  root: scrollParent,
  rootMargin: () => props.rootMargin,
  threshold: 0,
  target: loadMoreRef,
  disabled: () => props.disabled,
})

watch(isIntersecting, () => {
  if (!props.disabled && isIntersecting.value && props.status === LoadMoreStatus.INCOMPLETE) {
    emit('load')
  }
})

// 处理一页没有占满一屏的情况
watch(
  () => props.status,
  (status, prevStatus) => {
    if (prevStatus === LoadMoreStatus.LOADING && status === LoadMoreStatus.INCOMPLETE) {
      // INFO: 确保渲染完
      setTimeout(() => {
        if (!props.disabled && isIntersecting.value && status === LoadMoreStatus.INCOMPLETE) {
          emit('load')
        }
      }, 30)
    }
  },
)

// ============================ style ============================

const loadMoreClass = computed(() => {
  return [bem.b(), bem.m(props.status)]
})
</script>
