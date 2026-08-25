<template>
  <div ref="container" :class="waterfallClass" :style="waterfallStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref, useTemplateRef, watch } from 'vue'
import { createBem, throttle } from '../../utils'
import {
  type WaterfallProps,
  type WaterfallSlots,
  type WaterfallEmits,
  type WaterfallExpose,
  defaultWaterfallProps,
  waterfallContextKey,
} from './common'
import { type WaterfallMember } from './common'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<WaterfallProps>(), defaultWaterfallProps)

defineSlots<WaterfallSlots>()

const emit = defineEmits<WaterfallEmits>()

const bem = createBem('waterfall')

// ============================ size ============================
const containerRef = useTemplateRef('container')

const containerSize = useResizeObserver(containerRef)

const containerHeight = ref(0)

const columnWidth = computed(() => {
  return (containerSize.width - (props.columns - 1) * props.columnGap) / props.columns
})

// ============================ status ============================
let loadStatus: 'idle' | 'busy' = 'idle'

let loadedHandlers: (() => void)[] = []

const onLoad = (handler: () => void) => {
  nextTick(() => {
    if (loadStatus === 'idle') {
      handler()
    } else {
      if (!loadedHandlers.includes(handler)) {
        loadedHandlers.push(handler)
      }
    }
  })
}

const updateLoadStatus = () => {
  const includeLoading = members.some((member) => !member.loaded)
  if (includeLoading) {
    if (loadStatus === 'idle') {
      loadStatus = 'busy'
      emit('loadstart')
    }
  } else {
    if (loadStatus === 'busy') {
      loadedHandlers.forEach((handler) => handler())
      loadedHandlers = []

      loadStatus = 'idle'
      emit('load')
    }
  }
}

// ============================ members ============================
const members: WaterfallMember[] = []

const addMember = (member: WaterfallMember) => {
  if (!members.includes(member)) {
    members.push(member)
    reflow()
    updateLoadStatus()
  }
}

const removeMember = (member: WaterfallMember) => {
  if (members.includes(member)) {
    members.splice(members.indexOf(member), 1)
    reflow()
    updateLoadStatus()
  }
}

const reflow = throttle(() => {
  const columns = Array(props.columns)
    .fill(0)
    .map((_, index) => {
      return { colIndex: index, height: 0 }
    })

  let i = 0
  for (const member of members) {
    if (!member.loaded) {
      break
    }
    columns.sort((a, b) => a.height - b.height)
    const minColumn = columns[0]

    if (!minColumn) break

    member.beforeReflow()
    member.top = minColumn.height === 0 ? 0 : minColumn.height + props.rowGap
    member.left = (props.columnGap + columnWidth.value) * minColumn.colIndex
    member.visible = true
    minColumn.height = member.top + member.height
  }

  containerHeight.value = columns.sort((a, b) => b.height - a.height)[0].height
}, 50)

const onItemLoad = () => {
  reflow()
  updateLoadStatus()
}

watch(
  [() => props.columns, () => props.columnGap, () => props.rowGap, columnWidth],
  () => {
    reflow()
  },
  {
    flush: 'post',
  },
)

provide(
  waterfallContextKey,
  reactive({
    addMember,
    removeMember,
    onItemLoad,
    columnWidth: columnWidth,
  }),
)

// ============================ style ============================

const waterfallClass = computed(() => {
  return [bem.b()]
})

const waterfallStyle = computed(() => {
  return [
    {
      height: containerHeight.value + 'px',
    },
  ]
})

defineExpose<WaterfallExpose>({
  reflow,
  onLoad,
})
</script>
