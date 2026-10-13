<template>
  <div
    ref="rootRef"
    :class="bem.b()"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @pointerdown="onPointerDown"
  >
    <div :class="bem.e('group')" @wheel="handleWheel">
      <div
        :class="[bem.e('mask'), context.maskClass]"
        :style="[`background-size: 100% ${maskSize}px;`, context.maskStyle]"
      ></div>
      <div
        ref="indicatorRef"
        :class="[bem.e('indicator'), context.indicatorClass]"
        :style="context.indicatorStyle"
      ></div>
      <div
        ref="contentRef"
        :class="[bem.e('content')]"
        :style="{ padding, '--picker-view-indicator-height': `${indicatorSize.height}px` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, ref, watch, watchPostEffect } from 'vue'
import { createBem, Friction, Spring, useScroller } from '../../utils'
import { usePointerDown, useResizeObserver } from '../../use'
import {
  type PickerViewColumnHandle,
  type PickerViewColumnSlots,
  pickerViewContextKey,
} from './common'

const props = defineProps<{
  /**
   * 选项数量。**推荐由知道数据的那一层传入**（如 Picker 会传 `column.length`）：
   * 不传时回落到观察 DOM 子节点数，但整列重建时 DOM 会有中间态（少到 1 个），
   * 会被下文的「按列数夹取」误判成 0，导致整列跳回第一行。
   */
  itemCount?: number
}>()

defineSlots<PickerViewColumnSlots>()

const bem = createBem('picker-view-column')

// 身份句柄：普通对象，仅用于在 PickerView 侧定位「我是第几列」。
// 不能用 getCurrentInstance()：vapor 渲染子组件期间它返回的是发起本次渲染的组件，
// 所有列会拿到同一个实例（详见 common.ts 里 PickerViewColumnHandle 的说明）。
const handle: PickerViewColumnHandle = { __pickerViewColumn: true }

const rootRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)

const context = inject(pickerViewContextKey)!

// 登记自身句柄，使 PickerView 能按登记（渲染）顺序定位当前位于第几列
context.registerColumn(handle)

onUnmounted(() => {
  context.unregisterColumn(handle)
})

const columnValue = context.getColumnValue(handle)

const domItemCount = ref(0)

// 优先用父级传进来的数量（反应式、不会有 DOM 中间态）
const itemCount = computed(() => props.itemCount ?? domItemCount.value)

// 选项数量回落到渲染后的 DOM 子节点数
const updateItemCount = () => {
  domItemCount.value = contentRef.value?.children.length ?? 0
}

let contentObserver: MutationObserver | null = null

watch(
  contentRef,
  (el, _oldEl, onCleanup) => {
    contentObserver?.disconnect()
    contentObserver = null
    if (!el) return

    updateItemCount()
    contentObserver = new MutationObserver(updateItemCount)
    contentObserver.observe(el, { childList: true })

    onCleanup(() => {
      contentObserver?.disconnect()
      contentObserver = null
    })
  },
  { immediate: true, flush: 'post' },
)

const rootSize = useResizeObserver(rootRef)
const contentSize = useResizeObserver(contentRef)
const indicatorSize = useResizeObserver(indicatorRef)

const maskSize = computed(() => (rootSize.height - indicatorSize.height) / 2)

const contentHeight = computed(() => {
  return contentSize.height + maskSize.value * 2
})

const padding = computed(() => `${maskSize.value}px 0`)

// ============================ scroll ============================
const { position, update, scrollTo, isIdle, handleTouchStart, handleTouchMove, handleTouchEnd } =
  useScroller({
    itemSize: indicatorSize.height,
    friction: new Friction(0.0001),
    spring: new Spring(2, 90, 20),
    onSnap: (index) => {
      if (!isNaN(index) && index !== columnValue.value) {
        columnValue.value = index
      }
    },
    onTap: (event) => {
      handleTap(event)
    },
  })

let updatePending = false

watch(
  [() => indicatorSize.height, columnValue, itemCount, () => rootSize.height, contentHeight],
  () => {
    if (updatePending) return
    updatePending = true

    // NOTE: 确保短期内所有元素高度改变仅执行一次 update
    setTimeout(() => {
      updatePending = false
      if (indicatorSize.height) {
        const current = Math.max(Math.min(columnValue.value, itemCount.value - 1), 0)
        update(
          current * indicatorSize.height,
          indicatorSize.height,
          rootSize.height,
          contentHeight.value,
        )
      }
    })
  },
  {
    flush: 'post',
  },
)

// ============================ style ============================
watchPostEffect(() => {
  const el = contentRef.value
  if (!el) return
  const transform = 'translateY(' + position.value + 'px) translateZ(0)'
  el.style.transform = transform
})

// ============================ events ============================

let oldDeltaY = 0

function handleWheel(event: Event) {
  const deltaY = oldDeltaY + (event as WheelEvent).deltaY
  if (Math.abs(deltaY) > 10) {
    oldDeltaY = 0
    let current = Math.min(columnValue.value + (deltaY < 0 ? -1 : 1), itemCount.value - 1)
    columnValue.value = current = Math.max(current, 0)
    scrollTo(current * indicatorSize.height)
  } else {
    oldDeltaY = deltaY
  }
  event.preventDefault()
}

function handleTap({ changedTouches: [{ clientY }] }: TouchEvent) {
  const el = rootRef.value as HTMLElement
  if (isIdle()) {
    const rect = el.getBoundingClientRect()
    const r = clientY - rect.top - rootSize.height / 2
    const o = indicatorSize.height / 2
    if (!(Math.abs(r) <= o)) {
      const a = Math.ceil((Math.abs(r) - o) / indicatorSize.height)
      const s = r < 0 ? -a : a
      let current = Math.min(columnValue.value + s, itemCount.value - 1)
      columnValue.value = current = Math.max(current, 0)
      scrollTo(current * indicatorSize.height)
    }
  }
}

const onTouchStart = (event: TouchEvent) => {
  handleTouchStart(event)
}

const onTouchMove = (event: TouchEvent) => {
  handleTouchMove(event)
  event.stopPropagation()
}

const onTouchEnd = (event: TouchEvent) => {
  handleTouchEnd(event)
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)
</script>
