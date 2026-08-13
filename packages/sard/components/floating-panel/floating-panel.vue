<template>
  <div
    :class="floatingPanelClass"
    :style="floatingPanelStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
  >
    <div :class="bem.e('header')">
      <div :class="bem.e('header-bar')"></div>
    </div>
    <div ref="scroll" :class="bem.e('body')" @scroll="onScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type FloatingPanelProps,
  type FloatingPanelSlots,
  type FloatingPanelEmits,
  type FloatingPanelExpose,
  defaultFloatingPanelProps,
} from './common'
import { usePointerDown, useInitialVelocity } from '../../use'

const props = withDefaults(defineProps<FloatingPanelProps>(), defaultFloatingPanelProps)

defineSlots<FloatingPanelSlots>()

const emit = defineEmits<FloatingPanelEmits>()

const bem = createBem('floating-panel')

// main

const mergedAnchors = computed(() => {
  return props.anchors || [100, ~~(window.innerHeight * 0.6)]
})

let startY = 0
let prevY = 0
const offsetY = ref(0)
const isDown = ref(false)
let target: 'scroll' | 'panel' = 'scroll'

watch(
  mergedAnchors,
  () => {
    offsetY.value = mergedAnchors.value[0]
  },
  {
    immediate: true,
  },
)

watch(
  () => props.height,
  () => {
    if (props.height) {
      offsetY.value = props.height
    }
  },
  {
    immediate: true,
  },
)

const triggerChange = (value: number, touchEnd?: boolean) => {
  if (offsetY.value !== value) {
    offsetY.value = value
    emit('update:height', offsetY.value)
    if (touchEnd) {
      emit('height-change', offsetY.value)
    }
  }
}

let targetLocked = false
const MIN_DELTA = 3

let isAtTop = false
let isAtBottom = false

let canScroll = false

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollRef.value!
  isAtTop = scrollTop <= 0
  isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
}

const scrollRef = useTemplateRef('scroll')

const initVelocity = useInitialVelocity()

const onTouchStart = (event: TouchEvent) => {
  isDown.value = true
  const { clientX, clientY } = event.touches[0]
  prevY = startY = clientY

  canScroll = offsetY.value > mergedAnchors.value[0]

  initVelocity.start(clientX, clientY)
}

const onTouchMove = (event: TouchEvent) => {
  const targetEl = event.target as Element
  const isAtScroll = targetEl === scrollRef.value || scrollRef.value!.contains(targetEl)
  if (isAtScroll && !props.contentDraggable) {
    return
  }

  const { clientX, clientY } = event.touches[0]

  const moveY = clientY
  const startDeltaY = moveY - startY

  if (Math.abs(startDeltaY) < MIN_DELTA) return

  if (!targetLocked) {
    if (
      !canScroll ||
      !isAtScroll ||
      (startDeltaY > 0 && isAtTop) ||
      (startDeltaY < 0 && isAtBottom)
    ) {
      target = 'panel'
    } else {
      target = 'scroll'
    }
    targetLocked = true
  }

  if (target === 'panel') {
    let deltaY = prevY - moveY
    prevY = moveY
    event.preventDefault()
    const anchors = mergedAnchors.value
    if (offsetY.value > anchors[anchors.length - 1] || offsetY.value < anchors[0]) {
      deltaY /= 4
    }
    triggerChange(offsetY.value + deltaY)

    initVelocity.move(clientX, clientY)
  }
}

function getCorrectOffset(direction?: 'up' | 'down') {
  const anchors = mergedAnchors.value
  const min = anchors[0]
  const max = anchors[anchors.length - 1]
  const current = offsetY.value

  if (current <= min) {
    return min
  } else if (current >= max) {
    return max
  }

  for (let i = 1; i < anchors.length; i++) {
    const below = anchors[i - 1]
    const above = anchors[i]

    if (current >= below && current <= above) {
      if (direction) {
        return direction === 'up' ? above : below
      } else {
        return above - current < current - below ? above : below
      }
    }
  }

  return 0
}

const onTouchEnd = () => {
  if (target === 'panel') {
    const velocity = initVelocity.end()
    let value = 0
    if (Math.abs(velocity.y) > 0.5) {
      value = getCorrectOffset(velocity.y > 0 ? 'down' : 'up')
    } else {
      value = getCorrectOffset()
    }
    triggerChange(value, true)
  }
  targetLocked = false
  isDown.value = false
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

// others
const floatingPanelClass = computed(() => {
  return [bem.b(), bem.m('safe', props.safeAreaInsetBottom)]
})

const floatingPanelStyle = computed(() => {
  return {
    transform: `translate3d(0, calc(100% - ${offsetY.value}px), 0)`,
    height: `${mergedAnchors.value[mergedAnchors.value.length - 1]}px`,
    transition: isDown.value
      ? 'none'
      : `transform ${props.duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
  }
})

defineExpose<FloatingPanelExpose>({})
</script>
