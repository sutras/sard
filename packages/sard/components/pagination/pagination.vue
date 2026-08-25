<template>
  <div :class="paginationClass">
    <div
      :class="[bem.e('item'), bem.is('disabled', innerCurrent === 1), bem.e('prev')]"
      @click="onPrevClick"
    >
      <slot name="prev">
        {{ t('previous') }}
      </slot>
    </div>
    <div v-if="type === 'simple'" :class="bem.e('ratio')">
      {{ innerCurrent }}/{{ innerPageCount }}
    </div>
    <template v-else>
      <div
        v-for="item in multiItems"
        :key="item.key"
        :class="[bem.e('item'), bem.is('current', item.active)]"
        @click="onItemClick(item.page)"
      >
        {{ item.text }}
      </div>
    </template>
    <div
      :class="[bem.e('item'), bem.is('disabled', innerCurrent === innerPageCount), bem.e('next')]"
      @click="onNextClick"
    >
      <slot name="next">
        {{ t('next') }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createBem, clamp } from '../../utils'
import { useTranslateWithPrefix } from '../../locale'
import {
  type PaginationProps,
  type PaginationSlots,
  type PaginationEmits,
  getPageRange,
  defaultPaginationProps,
} from './common'

const { t } = useTranslateWithPrefix('pagination')

const props = withDefaults(defineProps<PaginationProps>(), defaultPaginationProps)

defineSlots<PaginationSlots>()

const emit = defineEmits<PaginationEmits>()

const bem = createBem('pagination')

const innerPageCount = computed(() => {
  return (props.pageCount ?? Math.ceil(props.total / props.pageSize)) || 1
})

const innerCurrent = ref(props.current)

watch(
  () => props.current,
  () => {
    innerCurrent.value = props.current
  },
)

const range = computed(() => {
  return getPageRange(innerCurrent.value, innerPageCount.value, props.pageButtonCount)
})

const onPrevClick = () => {
  if (innerCurrent.value > 1) {
    changeTo(innerCurrent.value - 1)
  }
}

const onNextClick = () => {
  if (innerCurrent.value < innerPageCount.value) {
    changeTo(innerCurrent.value + 1)
  }
}

const onItemClick = (page: number) => {
  changeTo(page)
}

const changeTo = (page: number) => {
  if (page !== innerCurrent.value) {
    innerCurrent.value = page
    emit('update:current', page)
    emit('change', page)
  }
}

const multiItems = computed(() => {
  if (props.type === 'simple') {
    return []
  }

  const length = range.value[1] - range.value[0] + 1

  return Array(length)
    .fill(0)
    .map((_, i) => {
      let page = i + range.value[0]
      const isPrevMulti = i === 0 && page !== 1
      const isNextMulti = i === length - 1 && page !== innerPageCount.value
      const type = isPrevMulti ? -1 : isNextMulti ? 1 : 0

      page =
        type === 0
          ? page
          : clamp(innerCurrent.value + type * props.multiCount, 1, innerPageCount.value)

      return {
        active: innerCurrent.value === page,
        page,
        key: i,
        text: props.ellipsis && (isPrevMulti || isNextMulti) ? '...' : page,
      }
    })
})

// ============================ style ============================
const paginationClass = computed(() => {
  return [bem.b(), bem.m(props.type)]
})
</script>
