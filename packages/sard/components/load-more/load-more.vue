<template>
  <div :class="loadMoreClass" @click="onClick">
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
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type LoadMoreProps,
  type LoadMoreSlots,
  type LoadMoreEmits,
  defaultLoadMoreProps,
} from './common'
import { useTranslateWithPrefix } from '../../locale'
import Loading from '../loading/loading.vue'

const props = withDefaults(defineProps<LoadMoreProps>(), defaultLoadMoreProps)

defineSlots<LoadMoreSlots>()

const emit = defineEmits<LoadMoreEmits>()

const bem = createBem('load-more')

const { t } = useTranslateWithPrefix('loadMore')

const onClick = () => {
  if (props.status === 'incomplete') {
    emit('load-more')
  } else if (props.status === 'error') {
    emit('reload')
  }
}

// ============================ style ============================

const loadMoreClass = computed(() => {
  return [bem.b(), bem.m(props.status)]
})
</script>
