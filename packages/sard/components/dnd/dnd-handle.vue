<template>
  <div
    :class="dndHandleClass"
    @touchstart.stop.prevent="onDragTouchStart"
    @touchmove.stop.prevent="onDragTouchMove"
    @touchend="onDragTouchEnd"
    @touchcancel="onDragTouchEnd"
    @pointerdown.stop="onDragPointerDown"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { createBem } from '../../utils'
import {
  type DndHandleProps,
  type DndHandleSlots,
  type DndHandleEmits,
  type DndHandleExpose,
  dndItemContextKey,
} from './common'
import { usePointerDown, useSimulatedPress } from '../../use'

withDefaults(defineProps<DndHandleProps>(), {})

defineSlots<DndHandleSlots>()

defineEmits<DndHandleEmits>()

const bem = createBem('dnd-handle')

// main
const itemContext = inject(dndItemContextKey)

if (!itemContext) {
  throw new Error('DndHandle must be included in DndItem.')
}

const dragging = ref(false)

const onDragTouchStart = (event: TouchEvent) => {
  itemContext.immediateStart()
  onDragSimulatedPressTouchStart(event)
}

const onDragTouchMove = (event: TouchEvent) => {
  onDragSimulatedPressTouchMove(event)
}

const onDragTouchEnd = () => {
  dragging.value = false
  onDragSimulatedPressTouchEnd()
}

const [
  onDragSimulatedPressTouchStart,
  onDragSimulatedPressTouchMove,
  onDragSimulatedPressTouchEnd,
] = useSimulatedPress({
  start: () => {
    dragging.value = true
    itemContext.start()
  },
  move: (_, { delta }) => {
    itemContext.move(delta.y)
  },
  end: () => {
    itemContext.end()
  },
  duration: 150,
})

const onDragPointerDown = usePointerDown(onDragTouchStart, onDragTouchMove, onDragTouchEnd)

// others
defineExpose<DndHandleExpose>({})

const dndHandleClass = computed(() => {
  return [bem.b(), bem.m('dragging', dragging)]
})
</script>
