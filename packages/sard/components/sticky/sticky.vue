<template>
  <div ref="target" :class="bem.b()" :style="stickyStyle">
    <div ref="fixation" :class="bem.e('fixation')" :style="fixationStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
  toValue,
  useTemplateRef,
  watch,
  type StyleValue,
} from 'vue'
import { createBem, isNumber } from '../../utils'
import {
  useIntersectionObserver,
  usePageScroll,
  useResizeObserver,
  useWindowResize,
} from '../../use'
import {
  type StickyProps,
  type StickySlots,
  type StickyEmits,
  type StickyExpose,
  stickyContextKey,
} from './common'

const props = withDefaults(defineProps<StickyProps>(), {})

defineSlots<StickySlots>()

defineEmits<StickyEmits>()

const bem = createBem('sticky')

const targetRef = useTemplateRef('target')

const positionStyle = reactive<{
  position: 'relative' | 'fixed'
  top: string
  bottom: string
}>({
  position: 'relative',
  top: '',
  bottom: '',
})

const boundingBox = ref<'top' | 'bottom' | 'none'>('none')

const fixationRef = useTemplateRef('fixation')
const fixationSize = useResizeObserver(fixationRef)

const context = inject(stickyContextKey, null)

// ============================ 粘性元素与视口相交 ============================
const updatePosition = () => {
  const target = targetRef.value
  if (!target) return

  let position: 'relative' | 'fixed' = 'relative'
  let top = ''
  let bottom = ''

  const targetRect = target.getBoundingClientRect()

  if (isNumber(props.marginTop) && targetRect.top < -props.marginTop) {
    position = 'fixed'
    top = -props.marginTop + 'px'
  } else if (
    isNumber(props.marginBottom) &&
    targetRect.bottom > window.innerHeight + props.marginBottom
  ) {
    position = 'fixed'
    bottom = -props.marginBottom + 'px'
  }

  Object.assign(positionStyle, { position, top, bottom })
}

const { intersectionRatio } = useIntersectionObserver({
  target: targetRef,
  threshold: [1],
  rootMargin: computed(() => `${props.marginTop || 0}px 0px ${props.marginBottom || 0}px`),
})

watch(
  [intersectionRatio, targetRef, () => props.marginTop, () => props.marginBottom],
  updatePosition,
  {
    immediate: true,
    flush: 'post',
  },
)

usePageScroll(updatePosition)
useWindowResize(updatePosition)

// ============================ 父容器与视口相交 ============================
if (context) {
  const { isIntersecting } = useIntersectionObserver({
    target: context.box,
    threshold: [0],
    rootMargin: computed(() => {
      const marginTop = (props.marginTop || 0) - fixationSize.height
      const marginBottom = (props.marginBottom || 0) - fixationSize.height
      return `${marginTop}px 0px ${marginBottom}px`
    }),
  })

  const updateBoundingBox = () => {
    const box = toValue(context.box)
    if (!box) return

    const boxRect = box.getBoundingClientRect()

    if (boxRect.top > window.innerHeight - fixationSize.height + (props.marginBottom || 0)) {
      boundingBox.value = 'top'
    } else if (boxRect.bottom < fixationSize.height - (props.marginTop || 0)) {
      boundingBox.value = 'bottom'
    } else {
      boundingBox.value = 'none'
    }
  }

  watch([isIntersecting, targetRef, context.box], updateBoundingBox, {
    immediate: true,
    flush: 'post',
  })

  usePageScroll(updateBoundingBox)
  useWindowResize(updateBoundingBox)
}

const stickyStyle = computed(() => {
  const { width, height } = fixationSize
  return {
    width: width ? width + 'px' : 'auto',
    height: height ? height + 'px' : 'auto',
  }
})

const fixationStyle = computed<StyleValue>(() => {
  return [
    {
      zIndex: props.zIndex,
    },
    boundingBox.value === 'none'
      ? positionStyle
      : {
          position: 'absolute',
          top: boundingBox.value === 'top' ? 0 : '',
          bottom: boundingBox.value === 'bottom' ? 0 : '',
        },
  ]
})

defineExpose<StickyExpose>({})
</script>
