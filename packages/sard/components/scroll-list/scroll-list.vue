<template>
  <div :class="bem.b()">
    <div ref="scroll" :class="bem.e('scroll')" @scroll="onScroll">
      <div ref="wrapper" :class="bem.e('wrapper')">
        <slot></slot>
      </div>
    </div>
    <div v-if="!hideScrollbar" :class="bem.e('scrollbar')" :style="scrollbarStyle">
      <div :class="bem.e('scrollbar-thumb')" :style="thumbStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { createBem } from '../../utils'
import {
  type ScrollListProps,
  type ScrollListSlots,
  type ScrollListEmits,
  defaultScrollListProps,
} from './common'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<ScrollListProps>(), defaultScrollListProps)

defineSlots<ScrollListSlots>()

const emit = defineEmits<ScrollListEmits>()

const bem = createBem('scroll-list')

// main
const scrollRef = useTemplateRef('scroll')
const wrapperRef = useTemplateRef('wrapper')

const scrollLeft = ref(0)
const scrollWidth = ref(0)
const clientWidth = ref(0)

const update = () => {
  clientWidth.value = scrollRef.value!.clientWidth
  scrollWidth.value = scrollRef.value!.scrollWidth
}

useResizeObserver(wrapperRef, () => {
  update()
})

useResizeObserver(scrollRef, () => {
  update()
})

const onScroll = (event: Event) => {
  scrollLeft.value = scrollRef.value!.scrollLeft
  emit('scroll', event)
}

const scrollbarStyle = computed(() => {
  return {
    width: props.scrollbarWidth || '',
    backgroundColor: props.scrollbarBg,
  }
})

const thumbWidth = computed(() => {
  let width = clientWidth.value / scrollWidth.value
  if (!Number.isFinite(width)) {
    width = 0
  }
  return width
})

const hideScrollbar = computed(() => thumbWidth.value >= 1)

const thumbStyle = computed(() => {
  let offset = Math.abs(scrollLeft.value) / scrollWidth.value
  if (!Number.isFinite(offset)) {
    offset = 0
  }
  return {
    insetInlineStart: offset * 100 + '%',
    width: thumbWidth.value * 100 + '%',
    backgroundColor: props.thumbBg,
  }
})
</script>
