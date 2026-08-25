<template>
  <div ref="scroll" :class="marqueeClass">
    <div :class="bem.e('wrapper')" :style="wrapperStyle">
      <div ref="content" :class="bem.e('content')">
        <slot></slot>
      </div>
      <div v-if="overflowed" :class="bem.e('content')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { createBem, throttle } from '../../utils'
import { type MarqueeProps, type MarqueeSlots, defaultMarqueeProps } from './common'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<MarqueeProps>(), defaultMarqueeProps)

defineSlots<MarqueeSlots>()

const bem = createBem('marquee')

const scrollRef = useTemplateRef('scroll')
const contentRef = useTemplateRef('content')

const duration = ref(0)
const overflowed = ref(false)

const update = throttle(
  () => {
    const scrollRect = scrollRef.value!.getBoundingClientRect()
    const contentRect = contentRef.value!.getBoundingClientRect()

    const scrollSize = props.direction === 'vertical' ? scrollRect.height : scrollRect.width
    const contentSize = props.direction === 'vertical' ? contentRect.height : contentRect.width
    const wrapperSize = contentSize * 2

    overflowed.value = contentSize > scrollSize
    duration.value = overflowed.value ? (wrapperSize / props.speed) * 1000 : 0
  },
  50,
  {
    leading: false,
  },
)

onMounted(() => {
  update()
})

onBeforeUnmount(() => {
  update.cancel()
})

useResizeObserver(scrollRef, () => {
  update()
})

useResizeObserver(contentRef, () => {
  update()
})

// ============================ style ============================
const marqueeClass = computed(() => {
  return [bem.b(), bem.m(props.direction)]
})

const wrapperStyle = computed(() => {
  return {
    animationName: overflowed.value ? '' : 'none',
    animationDuration: `${duration.value}ms`,
    animationPlayState: overflowed.value ? 'running' : 'paused',
  }
})
</script>
