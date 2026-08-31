<template>
  <div ref="root" :class="bem.b()">
    <div
      :class="bem.e('gesture')"
      :style="pullDownRefreshStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @pointerdown="onPointerDown"
    >
      <div :class="bem.e('header')" :style="headerStyle">
        <slot v-if="status === 'unready'" name="unready" :progress="progress">
          <Loading type="clock" :class="bem.e('loading')" :animated="false" :progress="progress" />
        </slot>
        <slot v-else-if="status === 'ready'" name="ready">
          <Loading type="clock" :class="bem.e('loading')" :animated="false" />
        </slot>
        <slot v-else-if="status === 'loading'" name="loading">
          <Loading type="clock" :class="bem.e('loading')" />
        </slot>
        <slot v-else-if="status === 'done'" name="done"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { createBem, getScrollTop } from '../../utils'
import {
  type PullDownRefreshProps,
  type PullDownRefreshSlots,
  type PullDownRefreshEmits,
  type PullDownRefreshExpose,
  type PullDownRefreshStatus,
  defaultPullDownRefreshProps,
} from './common'
import { usePointerDown, useTimeout } from '../../use'
import Loading from '../loading/loading.vue'
import { useScrollParent } from '../../use/useScrollParent'

const props = withDefaults(defineProps<PullDownRefreshProps>(), defaultPullDownRefreshProps)

defineSlots<PullDownRefreshSlots>()

const emit = defineEmits<PullDownRefreshEmits>()

const bem = createBem('pull-down-refresh')

const rootRef = useTemplateRef('root')
const scrollParent = useScrollParent(rootRef)

const status = ref<PullDownRefreshStatus>('initial')
const translateY = ref(0)
const progress = computed(() => {
  return Math.min(translateY.value / props.threshold, 1)
})

const initialTimer = useTimeout()

const recoveringTimer = useTimeout()

const toLoading = () => {
  recoveringTimer.clear()
  initialTimer.clear()
  status.value = 'loading'
  if (!props.disabled) {
    translateY.value = props.headerHeight
  }
}

const toRecovering = () => {
  status.value = 'recovering'
  translateY.value = 0
  initialTimer.set(() => {
    status.value = 'initial'
  }, props.transitionDuration)
}

const toDone = () => {
  status.value = 'done'
  recoveringTimer.set(() => {
    toRecovering()
  }, props.doneDuration)
}

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      toLoading()
    } else {
      toDone()
    }
  },
)

onMounted(() => {
  if (props.loading) {
    toLoading()
  }
})

let startX = 0
let startY = 0
let movable = false
let lockDirection = ''
const isDragging = ref(false)

const checkScrollTop = () => {
  return getScrollTop(scrollParent.value!) === 0
}

const onTouchStart = (event: TouchEvent) => {
  if (props.disabled || status.value !== 'initial' || !checkScrollTop()) {
    return
  }
  startX = event.touches[0].clientX
  startY = event.touches[0].clientY
  movable = true
}

const onTouchMove = (event: TouchEvent) => {
  if (!movable || (lockDirection && lockDirection !== 'down')) {
    return
  }

  const deltaX = event.touches[0].clientX - startX
  const deltaY = event.touches[0].clientY - startY

  if (!lockDirection) {
    const isVertical = Math.abs(deltaY) >= Math.abs(deltaX)
    lockDirection = isVertical && deltaY > 0 ? 'down' : 'others'
  }

  if (lockDirection === 'down') {
    const offsetY = Math.max(deltaY, 0) / 2
    status.value = offsetY >= props.threshold ? 'ready' : 'unready'
    translateY.value = offsetY
    isDragging.value = true

    event.preventDefault()
    event.stopImmediatePropagation()
  }
}

const onTouchEnd = () => {
  movable = false
  lockDirection = ''
  isDragging.value = false

  switch (status.value) {
    case 'unready':
      toRecovering()
      return
    case 'ready':
      toLoading()
      emit('refresh')
      return
  }
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

// ============================ style ============================

const pullDownRefreshStyle = computed(() => {
  return {
    transform: `translate3d(0,${translateY.value}px,0)`,
    transitionDuration: (isDragging.value ? 0 : props.transitionDuration) + 'ms',
  }
})

const headerStyle = computed(() => {
  return {
    height: props.headerHeight + 'px',
  }
})

defineExpose<PullDownRefreshExpose>({})
</script>
