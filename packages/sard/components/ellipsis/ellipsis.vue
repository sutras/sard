<template>
  <div ref="root" :class="bem.b()">
    <div :class="contentClass" :style="contentStyle">
      {{ displayContent }}
      <span v-if="showAction" :class="actionClass" @click="onToggle">
        {{ actionText }}
      </span>
    </div>

    <!-- 唯一的测量层：整段高度、单行高度、二分候选都在这一块里量。
         内容是空的，两个 span（正文 + 展开按钮）由 JS 建、由 JS 直接改 textContent，
         每轮探测只有「一次写入 + 一次读取」，不触发组件重渲染。
         绝对定位 + contain，测量引起的布局失效既不会撑开可见布局，也不会传到祖先链。 -->
    <div ref="measure" :class="measureClass" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useModel, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type EllipsisEmits,
  type EllipsisPosition,
  type EllipsisProps,
  type EllipsisSlots,
  defaultEllipsisProps,
} from './common'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<EllipsisProps>(), defaultEllipsisProps)

defineSlots<EllipsisSlots>()

const emit = defineEmits<EllipsisEmits>()

const bem = createBem('ellipsis')

const measureClass = bem.e('measure')
const actionClass = bem.e('action')
/** 测量层里的按钮占位：只负责排版占位，不带 __action 类，避免同一个类名在 DOM 里出现两次 */
const measureActionClass = bem.e('measure-action')

// ============================ toggle ============================
const innerExpanded = useModel(props, 'expanded')

const onToggle = () => {
  const expanded = !innerExpanded.value
  innerExpanded.value = expanded
  emit('change', expanded)
}

const hasAction = computed(() => {
  return !!props.expandText && !!props.collapseText
})

const actionText = computed(() => {
  return innerExpanded.value ? props.collapseText : props.expandText
})

// ============================ calc ============================
const rootRef = useTemplateRef('root')
const measureRef = useTemplateRef('measure')

const isOverflow = ref(false)
const truncatedContent = ref(props.content)
const resizeWidth = ref(0)
const isMeasuring = ref(true)

/** 一轮探测的判定容差（px） */
const HEIGHT_TOLERANCE = 0.5

const getCharacters = (content: string) => {
  return Array.from(content)
}

const buildEllipsisText = (
  characters: string[],
  keepCount: number,
  position: EllipsisPosition,
  dots: string,
) => {
  const total = characters.length

  if (keepCount >= total) {
    return characters.join('')
  }

  if (keepCount <= 0) {
    return dots
  }

  if (position === 'start') {
    return dots + characters.slice(total - keepCount).join('')
  }

  if (position === 'middle') {
    const leftCount = Math.ceil(keepCount / 2)
    const rightCount = Math.floor(keepCount / 2)
    return (
      characters.slice(0, leftCount).join('') + dots + characters.slice(total - rightCount).join('')
    )
  }

  return characters.slice(0, keepCount).join('') + dots
}

/**
 * 测量层里的两个节点，挂载后建一次就复用。
 * 不用模板声明是因为 `white-space: pre-wrap` 会把模板的换行缩进变成真实空格/空行，
 * 量高度时全算进去。
 */
let measureText: HTMLElement | undefined
let measureAction: HTMLElement | undefined

function ensureMeasureDom(measure: HTMLElement) {
  if (measureText?.parentElement === measure) {
    return
  }

  measureText = document.createElement('span')
  measureAction = document.createElement('span')
  measureAction.className = measureActionClass
  measure.replaceChildren(measureText, measureAction)
}

/**
 * 写入一轮要测量的内容。
 * withAction 为 false 时把按钮藏起来，用来量「纯正文」到底占几行。
 */
function writeMeasure(text: string, withAction: boolean) {
  if (!measureText || !measureAction) {
    return
  }

  measureText.textContent = text
  // 可见层里正文和按钮之间有一个空格（模板换行折叠而来），这里补上：
  // 少算这个空格，最后一行就会多塞几个字，按钮被挤到下一行再被 line-clamp 裁掉
  measureAction.textContent = ` ${props.expandText ?? ''}`
  measureAction.style.display = withAction && hasAction.value ? '' : 'none'
}

const measureHeight = () => measureRef.value?.getBoundingClientRect().height ?? 0

const update = () => {
  const content = props.content || ''
  const measure = measureRef.value

  if (!measure) {
    return
  }

  ensureMeasureDom(measure)
  isMeasuring.value = true

  if (!content) {
    truncatedContent.value = ''
    isOverflow.value = false
    isMeasuring.value = false
    return
  }

  writeMeasure(content, false)

  // 单行高度：临时关掉换行量一次。不能用 computed line-height 推算——
  // `line-height: normal` 拿不到 px，混排字体的行盒高也未必等于 line-height
  measure.style.whiteSpace = 'nowrap'
  const lineHeight = measureHeight()
  measure.style.whiteSpace = ''

  const clampHeight = lineHeight * props.rows

  if (measureHeight() - clampHeight <= HEIGHT_TOLERANCE) {
    truncatedContent.value = content
    isOverflow.value = false
    isMeasuring.value = false
    return
  }

  // 放不下：二分「保留几个字」，每次探测只写一次文本、读一次高度
  const characters = getCharacters(content)
  let low = 0
  let high = characters.length
  let best = 0

  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    writeMeasure(buildEllipsisText(characters, middle, props.position, props.dots), true)

    if (measureHeight() <= clampHeight + HEIGHT_TOLERANCE) {
      best = middle
      low = middle + 1
    } else {
      high = middle - 1
    }
  }

  truncatedContent.value = buildEllipsisText(characters, best, props.position, props.dots)
  isOverflow.value = true
  isMeasuring.value = false
}

useResizeObserver(rootRef, (size) => {
  if (resizeWidth.value && Math.abs(size.width - resizeWidth.value) <= 0.5) {
    return
  }

  resizeWidth.value = size.width
  update()
})

watch(
  [
    () => props.content,
    () => props.rows,
    () => props.position,
    () => props.dots,
    // 按钮文案变了，最后一行为它预留的宽度也变了，截断点要跟着重算
    () => props.expandText,
  ],
  () => {
    update()
  },
)

onMounted(() => {
  update()
})

const useClampFallback = computed(() => {
  return isMeasuring.value && !innerExpanded.value
})

const displayContent = computed(() => {
  if (useClampFallback.value) {
    return props.content
  }

  if (innerExpanded.value || !isOverflow.value) {
    return props.content
  }

  return truncatedContent.value
})

const showAction = computed(() => {
  if (useClampFallback.value) {
    return false
  }

  if (!isOverflow.value) {
    return false
  }

  return hasAction.value
})

const contentClass = computed(() => {
  return [bem.e('content'), bem.em('content', 'clamp', useClampFallback.value)]
})

const contentStyle = computed(() => {
  if (useClampFallback.value) {
    return {
      '-webkit-line-clamp': props.rows,
    }
  }

  return ''
})
</script>
