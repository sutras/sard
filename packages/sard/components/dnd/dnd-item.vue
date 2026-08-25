<template>
  <OnlyChild :class="dndItemClass" @update="onUpdate">
    <slot></slot>
  </OnlyChild>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  watchPostEffect,
} from 'vue'
import { createBem, OnlyChild } from '../../utils'
import {
  type DndItemProps,
  type DndItemSlots,
  type DndItemEmits,
  type DndItemExpose,
  dndItemContextKey,
} from './common'
import { dndContextKey, type DndItemInfo } from './common'

const props = withDefaults(defineProps<DndItemProps>(), {})

defineSlots<DndItemSlots>()

defineEmits<DndItemEmits>()

const bem = createBem('dnd-item')

// ============================ context ============================
const dndContext = inject(dndContextKey)

if (!dndContext) {
  throw new Error('DndItem must be included in Dnd.')
}

// ============================ drag ============================

const elRef = shallowRef<HTMLElement | null>(null)
const onUpdate = (el: HTMLElement | null) => {
  elRef.value = el
}

let dropItemInfo: DndItemInfo | null = null
let currentIndex = -1
let targetIndex = 0

const translateY = ref(0)

const getNodeRect = () => {
  return elRef.value!.getBoundingClientRect()
}

onMounted(() => {
  dndContext.addRectItem(getNodeRect)
})

onBeforeUnmount(() => {
  dndContext.removeRectItem(getNodeRect)
})

let rectInfoList: { rect: DOMRect; itemInfo: DndItemInfo }[] | null = null

const immediateStart = async () => {
  Promise.all(dndContext.rectItems.map((getRect) => getRect())).then((rects) => {
    rectInfoList = rects
      .sort((a, b) => a.top - b.top)
      .map((rect, i) => {
        return {
          rect,
          itemInfo: dndContext.list[i].itemInfo,
        }
      })
  })
}

const start = async () => {
  dndContext.dragging = true
  const itemInfo = props.itemInfo
  itemInfo.dragging = true
}

const move = (delta: number) => {
  if (!rectInfoList) return

  if (currentIndex === -1) {
    currentIndex = rectInfoList.findIndex((item) => item.itemInfo === props.itemInfo)
    dndContext.currentHeight = rectInfoList[currentIndex].rect.height
    dndContext.dragStart(currentIndex)
  }

  translateY.value = delta

  const { rect } = rectInfoList[currentIndex]

  targetIndex = (() => {
    if (delta < 0) {
      const top = rect.top + delta
      for (let i = 0; i < currentIndex; i++) {
        const targetRect = rectInfoList[i].rect
        if (top < targetRect.top + targetRect.height / 2) {
          return i
        }
      }
    } else if (delta > 0) {
      const bottom = rect.bottom + delta
      for (let i = rectInfoList.length - 1; i > currentIndex; i--) {
        const targetRect = rectInfoList[i].rect
        if (bottom > targetRect.bottom - targetRect.height / 2) {
          return i
        }
      }
    }
    return currentIndex
  })()

  const targetItemInfo = rectInfoList[targetIndex].itemInfo

  if (dropItemInfo !== targetItemInfo) {
    rectInfoList.forEach((item, index) => {
      item.itemInfo.offset =
        index < currentIndex
          ? index >= targetIndex
            ? 1
            : 0
          : index > currentIndex
            ? index <= targetIndex
              ? -1
              : 0
            : 0
    })
    if (dropItemInfo) {
      dndContext.dragMove(currentIndex, targetIndex)
    }
    dropItemInfo = targetItemInfo
  }
}

const end = () => {
  const _currentIndex = currentIndex
  const _targetIndex = dropItemInfo ? targetIndex : currentIndex
  rectInfoList = null
  dropItemInfo = null
  dndContext.dragging = false
  const itemInfo = props.itemInfo
  itemInfo.dragging = false
  translateY.value = 0
  currentIndex = -1
  dndContext.list.forEach(({ itemInfo }) => {
    itemInfo.offset = 0
  })
  dndContext.drop(_currentIndex, _targetIndex)
}

provide(dndItemContextKey, {
  immediateStart,
  start,
  move,
  end,
})

// ============================ style ============================

const dndItemClass = computed(() => {
  return [
    bem.b(),
    bem.m('active', props.itemInfo.dragging),
    bem.m('passive', !props.itemInfo.dragging && dndContext.dragging),
  ]
})

watchPostEffect(() => {
  const el = elRef.value
  if (!el) return

  const y = props.itemInfo.dragging
    ? translateY.value
    : dndContext.currentHeight * props.itemInfo.offset
  el.style.setProperty('transform', `translate3d(0,${y}px,0)`)
})

defineExpose<DndItemExpose>({})
</script>
