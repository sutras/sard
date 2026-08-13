<template>
  <Popup
    effect="full-fade"
    :overlay-class="[bem.e('overlay'), bem.is('preview-image'), bem.is('immersive', isImmersive)]"
    :visible="innerVisible"
    @visible-hook="onVisibleHook"
  >
    <div
      :class="[bem.b(), bem.is('immersive', isImmersive)]"
      :style="immersiveStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @pointerdown="onPointerDown"
    >
      <Swiper
        v-model="current"
        loop
        :duration="visibleSwitching ? 0 : 300"
        :space-between="20"
        :class="[bem.e('swiper'), bem.is('preview-image')]"
      >
        <SwiperItem v-for="(url, index) in urls" :key="index">
          <PreviewImageItem :url="url" />
        </SwiperItem>
      </Swiper>
    </div>
    <div :class="bem.e('toolbar')">
      <div :class="bem.e('indicator')">{{ current + 1 }} / {{ urls.length }}</div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { clamp, createBem } from '../../utils'
import {
  type PreviewImageProps,
  type PreviewImageSlots,
  type PreviewImageEmits,
  type PreviewImageExpose,
  defaultPreviewImageProps,
  previewImageContextKey,
} from './common'

import Popup from '../popup/popup.vue'
import { computed, provide, reactive, ref, useModel, watch } from 'vue'
import { useInitialVelocity, usePointerDown, useTimeout } from '../../use'
import Swiper from '../swiper/swiper.tsx'
import SwiperItem from '../swiper/swiper-item.tsx'
import PreviewImageItem from './preview-image-item.vue'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<PreviewImageProps>(), defaultPreviewImageProps)

defineSlots<PreviewImageSlots>()

const emit = defineEmits<PreviewImageEmits>()

defineExpose<PreviewImageExpose>({})

const bem = createBem('preview-image')

// ============================ visible ============================
const innerVisible = useModel(props, 'visible')

const visibleTimer = useTimeout()
const visibleSwitching = ref(false)

watch(innerVisible, () => {
  visibleSwitching.value = true
  visibleTimer.set(() => {
    visibleSwitching.value = false
  }, 150)
})

const onVisibleHook = (name: MotionHookName, el: Element) => {
  if (name === 'before-enter') {
    resetSlideDown()
  }
  emit('visible-hook', name, el)
  emit(name as any, el)
}

const close = () => {
  innerVisible.value = false
}

// ============================ provide ============================

const isImmersive = ref(false)
const sceneType = ref<'dragPinch' | 'swipe' | null>(null)

provide(
  previewImageContextKey,
  reactive({
    visibleSwitching: visibleSwitching,
    immersive: isImmersive,
    sceneType: sceneType,
    close,
  }),
)

// ============================ slide down ============================
let startX = 0
let startY = 0
let lockDirection = ''
let downTranslateY = 0
const translateY = ref(0)
const movable = ref(false)
let canResolveEnd = false

const initVelocity = useInitialVelocity()

const resetSlideDown = () => {
  translateY.value = 0
}

const onTouchStart = (event: TouchEvent) => {
  if (isImmersive.value) return

  const { clientX, clientY } = event.touches[0]
  startX = clientX
  startY = clientY

  initVelocity.start(clientX, clientY)

  downTranslateY = translateY.value

  movable.value = true
}

const onTouchMove = (event: TouchEvent) => {
  if (isImmersive.value || !movable.value || (lockDirection && lockDirection !== 'y')) return

  const { clientX, clientY } = event.touches[0]
  const deltaX = clientX - startX
  const deltaY = clientY - startY

  initVelocity.move(clientX, clientY)

  if (!lockDirection) {
    const isHorizontal = Math.abs(deltaX) >= Math.abs(deltaY)
    lockDirection = isHorizontal ? 'x' : 'y'
  }

  if (lockDirection !== 'y') return

  let nextTranslateY = downTranslateY + deltaY

  translateY.value = nextTranslateY

  canResolveEnd = true
}

const CLOSE_THRESHOLD = 80

const onTouchEnd = () => {
  if (canResolveEnd) {
    const velocity = initVelocity.end()

    const y = translateY.value
    const dependsOnSpeed = Math.abs(velocity.y) > 0.5

    if ((dependsOnSpeed && velocity.y > 0) || (!dependsOnSpeed && y >= CLOSE_THRESHOLD)) {
      close()
    } else {
      translateY.value = 0
    }
  }

  movable.value = false
  lockDirection = ''
  canResolveEnd = false
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

const SCALE_THRESHOLD = 300

const immersiveStyle = computed(() => {
  const scale =
    translateY.value === 0
      ? 1
      : clamp((SCALE_THRESHOLD - translateY.value) / SCALE_THRESHOLD, 0.1, 1)
  return {
    transform: `translate3d(0,${translateY.value}px,0) scale(${scale})`,
    transition: movable.value ? 'none' : `transform 300ms`,
    opacity: scale,
  }
})

// ============================ indicator ============================
const current = useModel(props, 'current')
</script>
