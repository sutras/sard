<template>
  <Overlay
    :visible="innerVisible"
    :z-index="zIndex"
    :class="[bem.e('overlay'), bem.is('fab')]"
    @click="onOverlayClick"
  />

  <teleport to="body">
    <div
      ref="bubble"
      v-bind="attrs"
      :class="fabClass"
      :style="fabStyle"
      @touchstart="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @pointerdown="onPointerDown"
    >
      <FabItem is-entry :color="color" :background="background" @click="onItemEntryClick">
        <slot name="entry" :visible="innerVisible">
          <Close v-if="innerVisible" />
          <Plus v-else />
        </slot>
      </FabItem>

      <Motion name="wide-zoom" @before-enter="onBeforeEnter">
        <div v-show="innerVisible" :class="contentClass" :style="contentStyle">
          <slot></slot>
        </div>
      </Motion>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRef, useAttrs, useModel } from 'vue'
import { createBem, isNullish } from '../../utils'
import {
  type FabProps,
  type FabSlots,
  type FabEmits,
  defaultFabProps,
  fabContextKey,
} from './common'
import { useZIndex } from '../../use'
import Overlay from '../overlay/overlay.vue'
import { useFloatingBubble } from '../floating-bubble/useFloatingBubble'
import FabItem from './fab-item.vue'
import { Close, Plus } from '@sard/icons'
import Motion from '../motion/motion.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FabProps>(), defaultFabProps)

const attrs = useAttrs()

defineSlots<FabSlots>()

const emit = defineEmits<FabEmits>()

const bem = createBem('fab')

const innerVisible = useModel(props, 'visible')

const [zIndex, increaseZIndex] = useZIndex()

const onBeforeEnter = () => {
  increaseZIndex()
}

const onItemEntryClick = (event: MouseEvent) => {
  if (stopBubbling.value) return

  innerVisible.value = !innerVisible.value

  emit('click', event)
}

const onItemClick = () => {
  innerVisible.value = false
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    innerVisible.value = false
  }
}

// ============================ floating bubble ============================
const {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onPointerDown,
  position,
  initialized,
  animated,
  stopBubbling,
  windowWidth,
  windowHeight,
} = useFloatingBubble(props, emit, {
  disabled: innerVisible,
})

const isTop = computed(() => {
  return props.draggable
    ? position.value.y > windowHeight / 2
      ? false
      : true
    : !isNullish(props.top)
})

const isLeft = computed(() => {
  return props.draggable
    ? position.value.x > windowWidth / 2
      ? false
      : true
    : !isNullish(props.left)
})

provide(
  fabContextKey,
  reactive({
    hideName: toRef(() => props.hideName),
    isLeft: isLeft,
    visible: innerVisible,
    onItemClick,
  }),
)

// ============================ style ============================

const fabClass = computed(() => {
  return [
    bem.b(),
    bem.m(isTop.value ? 'top' : 'bottom'),
    bem.m(isLeft.value ? 'left' : 'right'),
    bem.m('animated', animated.value),
    bem.m('initialized', initialized.value),
    bem.m('draggable', props.draggable),
  ]
})

const fabStyle = computed(() => {
  return {
    zIndex: innerVisible.value ? zIndex.value : '',
    ...(props.draggable
      ? {
          top: 0,
          transform: `translate3d(${position.value.x}px, ${position.value.y}px, 0)`,
        }
      : {
          top: props.top,
          left: props.left,
          right: isLeft.value ? 'auto' : props.right,
          bottom: isTop.value ? 'auto' : props.bottom,
        }),
  }
})

const contentClass = computed(() => {
  return bem.e('content')
})

const contentStyle = computed(() => {
  return {
    transformOrigin: `${isTop.value ? 'top' : 'bottom'} ${isLeft.value ? 'left' : 'right'}`,
  }
})
</script>
