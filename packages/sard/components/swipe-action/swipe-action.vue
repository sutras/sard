<template>
  <div
    ref="root"
    :class="bem.b()"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
  >
    <div
      :class="bem.e('content')"
      :style="translateStyle"
      @click="onContentClick"
      @pointerdown="onContentPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <slot></slot>
      <div v-if="slots.left" ref="left" :class="bem.e('left')" @click.stop>
        <slot name="left" :hide="hide" :async-hide="asyncHide"></slot>
      </div>
      <div v-if="slots.right" ref="right" :class="bem.e('right')" @click.stop>
        <slot name="right" :hide="hide" :async-hide="asyncHide"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { createBem, uniqid } from '../../utils'
import {
  type SwipeActionProps,
  type SwipeActionSlots,
  type SwipeActionEmits,
  type SwipeActionExpose,
  type SwipeActionVisible,
  type SwipeActionAsyncHide,
  defaultSwipeActionProps,
} from './common'
import {
  usePointerDown,
  useInitialVelocity,
  useStopMovedClick,
  useRtl,
  useClickOutside,
} from '../../use'

const props = withDefaults(defineProps<SwipeActionProps>(), defaultSwipeActionProps)

const slots = defineSlots<SwipeActionSlots>()

const emit = defineEmits<SwipeActionEmits>()

const bem = createBem('swipe-action')

// main
const swipeActionId = uniqid()

// visible
const innerVisible = ref<SwipeActionVisible>(props.visible || false)

watch(
  () => props.visible,
  () => {
    if (props.visible !== innerVisible.value) {
      innerVisible.value = props.visible || false
      setTranslateXByVisible(innerVisible.value)
    }
  },
)

const triggerVisible = (visible: SwipeActionVisible) => {
  if (innerVisible.value !== visible) {
    innerVisible.value = visible
    emit('update:visible', visible)
  }
}

let closeDisabled = false

const hide = () => {
  if (closeDisabled) return
  triggerVisible(false)
  setTranslateXByVisible(false)
}

const asyncHide: SwipeActionAsyncHide = (callback) => {
  closeDisabled = true

  const resolve = () => {
    closeDisabled = false
    hide()
  }

  const reject = () => {
    closeDisabled = false
  }

  callback(resolve, reject)
}

const onContentClick = () => {
  if (!props.disabled && !isStoppedClick.value) {
    hide()
  }
}

const {
  isStoppedClick,
  onPointerDown: onContentPointerDown,
  onPointerMove,
  onPointerUp,
} = useStopMovedClick()

useClickOutside(
  useTemplateRef('root'),
  () => {
    hide()
  },
  () => props.outsideClosable,
  'touchstart',
)

// swipe
const leftRef = useTemplateRef('left')
const rightRef = useTemplateRef('right')

let leftWidth: number | null = null
let rightWidth: number | null = null

const translateX = ref(0)
const movable = ref(false)

const isRtl = useRtl()

let startX = 0
let startY = 0
let downTranslateX = 0
let lockDirection = ''
let canResolveVisible = false

const initVelocity = useInitialVelocity()

const getWidth = () => {
  leftWidth = leftRef.value ? leftRef.value.getBoundingClientRect().width : null
  rightWidth = rightRef.value ? rightRef.value.getBoundingClientRect().width : null
}

const setTranslateXByVisible = (visible: SwipeActionVisible) => {
  translateX.value =
    visible === 'left' ? leftWidth || 0 : visible === 'right' ? -(rightWidth || 0) : 0
}

onMounted(() => {
  getWidth()

  if (innerVisible.value) {
    setTranslateXByVisible(innerVisible.value)
  }
})

const onTouchStart = (event: TouchEvent) => {
  // NOTE: 避免用户忘记调用 asyncHide reject
  closeDisabled = false

  if (props.disabled || (!slots.left && !slots.right)) {
    return
  }

  const { clientX, clientY } = event.touches[0]
  startX = clientX
  startY = clientY

  initVelocity.start(startX, startY)

  downTranslateX = translateX.value

  movable.value = true

  getWidth()
}

const onTouchMove = (event: TouchEvent) => {
  if (!movable.value || (lockDirection && lockDirection !== 'x')) {
    return
  }

  const { clientX, clientY } = event.touches[0]
  let deltaX = clientX - startX
  const deltaY = clientY - startY

  if (isRtl.value) {
    deltaX *= -1
  }

  initVelocity.move(clientX, clientY)

  if (!lockDirection) {
    const isHorizontal = Math.abs(deltaX) >= Math.abs(deltaY)
    lockDirection = isHorizontal ? 'x' : 'y'
  }

  if (lockDirection !== 'x') return

  if ((!slots.left || leftWidth !== null) && (!slots.right || rightWidth !== null)) {
    event.preventDefault()
    event.stopImmediatePropagation()

    let nextTranslateX = downTranslateX + deltaX
    const leftEdge = leftWidth !== null ? leftWidth : 0
    const rightEdge = rightWidth !== null ? -rightWidth : 0

    if (nextTranslateX > leftEdge) {
      nextTranslateX = leftEdge
    }
    if (nextTranslateX < rightEdge) {
      nextTranslateX = rightEdge
    }

    translateX.value = nextTranslateX

    canResolveVisible = true
  }
}

const onTouchEnd = () => {
  if (canResolveVisible) {
    const velocity = initVelocity.end()

    const dependsOnSpeed = Math.abs(velocity.x) > 0.3

    const x = translateX.value

    let nextVisible: 'left' | 'right' | false = false

    let velocityX = isRtl.value ? velocity.x * -1 : velocity.x

    if (x < 0) {
      if (
        (dependsOnSpeed && velocityX < 0) ||
        (!dependsOnSpeed && Math.abs(x) >= rightWidth! / 2)
      ) {
        nextVisible = 'right'
        translateX.value = -rightWidth!
      } else {
        translateX.value = 0
      }
    } else if (x > 0) {
      if ((dependsOnSpeed && velocityX > 0) || (!dependsOnSpeed && Math.abs(x) >= leftWidth! / 2)) {
        nextVisible = 'left'
        translateX.value = leftWidth!
      } else {
        translateX.value = 0
      }
    }

    triggerVisible(nextVisible)
  }

  movable.value = false
  lockDirection = ''
  canResolveVisible = false
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

// others
defineExpose<SwipeActionExpose>({
  hide,
})

const translateStyle = computed(() => {
  return {
    '--swipe-action-x-raw': `${translateX.value}px`,
    transition: movable.value ? 'none' : `transform 300ms`,
  }
})
</script>
