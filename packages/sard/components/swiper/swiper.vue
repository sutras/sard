<template>
  <div
    ref="rootRef"
    :class="[bem.b(), bem.m('vertical', vertical), bem.is('auto-height', autoHeight)]"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
  >
    <div ref="wrapperRef" :class="[bem.e('wrapper'), bem.is('vertical', vertical)]">
      <slot></slot>
    </div>
    <div v-if="showIndicator" :class="[bem.e('dots'), bem.is('vertical', vertical)]">
      <div
        v-for="index in pageCount"
        :key="index"
        :class="[bem.e('dot'), bem.is('active', activeIndex === index - 1)]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import { swiperProps, type SwiperEmits, type SwiperSlots } from './common'
import { useSwiper } from './useSwiper'

const props = defineProps(swiperProps)

defineSlots<SwiperSlots>()

const emit = defineEmits<SwiperEmits>()

const bem = createBem('swiper')

const {
  rootRef,
  wrapperRef,
  activeIndex,
  pageCount,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onPointerDown,
} = useSwiper(props, emit)
</script>
