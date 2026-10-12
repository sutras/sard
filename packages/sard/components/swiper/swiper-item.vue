<template>
  <div
    ref="elRef"
    :class="[bem.e('item'), bem.is('vertical', vertical), bem.is('auto-height', autoHeight)]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watchPostEffect } from 'vue'
import { createBem } from '../../utils'
import type { SwiperItemSlots } from './common'
import { useSwiperItem } from './useSwiper'

defineSlots<SwiperItemSlots>()

const bem = createBem('swiper')

const {
  elRef,
  member,
  context: { vertical, spaceBetween, autoHeight },
} = useSwiperItem()

watchPostEffect(() => {
  const el = elRef.value
  if (el) {
    el.style.setProperty('--swiper-item-offset-raw', member.offset + 'px')
    el.style.setProperty('--swiper-item-size', member.size + 'px')
    el.style.setProperty('--swiper-item-margin', spaceBetween.value + 'px')
  }
})
</script>
