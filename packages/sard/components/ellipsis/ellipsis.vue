<template>
  <div ref="root" :class="bem.b()">
    <div :class="contentClass" :style="contentStyle">
      {{ displayContent }}
      <span v-if="showAction" :class="bem.e('action')" @click="onToggle">
        {{ actionText }}
      </span>
    </div>
    <div ref="full" :class="bem.e('measure')">
      {{ props.content }}
    </div>
    <div ref="line" :class="[bem.e('measure'), bem.em('measure', 'line')]">
      {{ props.content }}
    </div>
    <div ref="calc" :class="bem.e('measure')">
      {{ measureContent }}
      <span v-if="hasAction" :class="bem.e('action')">
        {{ props.expandText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useModel, useTemplateRef, watch } from 'vue'
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
const fullRef = useTemplateRef('full')
const lineRef = useTemplateRef('line')
const calcRef = useTemplateRef('calc')

const isOverflow = ref(false)
const truncatedContent = ref(props.content)
const measureContent = ref(props.content)
const resizeWidth = ref(0)
const initialized = ref(false)
const isMeasuring = ref(true)

let updateToken = 0

const getCharacters = (content: string) => {
  return Array.from(content)
}

const buildEllipsisText = (
  content: string,
  keepCount: number,
  position: EllipsisPosition,
  dots: string,
) => {
  const characters = getCharacters(content)

  if (keepCount >= characters.length) {
    return content
  }

  if (keepCount <= 0) {
    return dots
  }

  if (position === 'start') {
    return dots + characters.slice(characters.length - keepCount).join('')
  }

  if (position === 'middle') {
    const leftCount = Math.ceil(keepCount / 2)
    const rightCount = Math.floor(keepCount / 2)
    return (
      characters.slice(0, leftCount).join('') +
      dots +
      characters.slice(characters.length - rightCount).join('')
    )
  }

  return characters.slice(0, keepCount).join('') + dots
}

const getHeight = (el: HTMLElement) => {
  return el.getBoundingClientRect().height
}

const update = async () => {
  const token = ++updateToken
  const content = props.content || ''
  isMeasuring.value = true

  if (!content) {
    truncatedContent.value = content
    measureContent.value = content
    isOverflow.value = false
    initialized.value = true
    if (token === updateToken) {
      isMeasuring.value = false
    }
    return
  }

  measureContent.value = content

  await nextTick()

  if (token !== updateToken) return

  const fullHeight = getHeight(fullRef.value!)
  const lineHeight = getHeight(lineRef.value!)

  if (token !== updateToken) return

  const clampHeight = lineHeight * props.rows
  const overflow = fullHeight - clampHeight > 0.5

  if (!overflow) {
    truncatedContent.value = content
    isOverflow.value = false
    initialized.value = true
    if (token === updateToken) {
      isMeasuring.value = false
    }
    return
  }

  const characters = getCharacters(content)
  let low = 0
  let high = characters.length
  let best = 0

  while (low <= high) {
    const middle = Math.floor((low + high) / 2)
    const nextText = buildEllipsisText(content, middle, props.position, props.dots)

    measureContent.value = nextText
    await nextTick()

    if (token !== updateToken) return

    const height = getHeight(calcRef.value!)

    if (token !== updateToken) return

    if (height <= clampHeight + 0.5) {
      best = middle
      low = middle + 1
    } else {
      high = middle - 1
    }
  }

  const nextTruncatedContent = buildEllipsisText(content, best, props.position, props.dots)

  if (token !== updateToken) return

  truncatedContent.value = nextTruncatedContent
  isOverflow.value = true
  initialized.value = true
  if (token === updateToken) {
    isMeasuring.value = false
  }
}

useResizeObserver(rootRef, (size) => {
  if (resizeWidth.value && Math.abs(size.width - resizeWidth.value) <= 0.5) {
    return
  }

  resizeWidth.value = size.width
  update()
})

watch([() => props.content, () => props.rows, () => props.position, () => props.dots], () => {
  update()
})

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
