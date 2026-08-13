<template>
  <div ref="target" :class="bem.b()" :style="stickyStyle">
    <div :class="bem.e('fixation')" :style="fixationStyle">
      <div ref="bound" :class="bem.e('bound')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  reactive,
  ref,
  toValue,
  useTemplateRef,
  watch,
  type StyleValue,
} from 'vue'
import { createBem, isNumber } from '../../utils'
import { useIntersectionObserver, useResizeObserver } from '../../use'
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

// main
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

const boundRef = useTemplateRef('bound')
const boundSize = useResizeObserver(boundRef)

const context = inject(stickyContextKey, null)

const size = computed(() => {
  return {
    width: boundSize.width + 'px',
    height: boundSize.height + 'px',
  }
})

// 粘性元素与视口相交
const { intersectionRatio } = useIntersectionObserver({
  target: targetRef,
  threshold: [1],
  rootMargin: computed(() => `${props.marginTop || 0}px 0px ${props.marginBottom || 0}px`),
})

watch(
  [intersectionRatio, targetRef, () => props.marginTop, () => props.marginBottom],
  () => {
    const target = targetRef.value
    if (!target) return

    Object.assign(positionStyle, {
      position: 'relative',
      top: '',
      bottom: '',
    })

    const targetRect = target.getBoundingClientRect()

    if (intersectionRatio.value < 1) {
      if (isNumber(props.marginTop) && targetRect.top < -props.marginTop) {
        positionStyle.position = 'fixed'
        positionStyle.top = -props.marginTop + 'px'
      } else if (
        isNumber(props.marginBottom) &&
        targetRect.bottom > window.innerHeight + props.marginBottom
      ) {
        positionStyle.position = 'fixed'
        positionStyle.bottom = -props.marginBottom + 'px'
      }
    }
  },
  {
    immediate: true,
    flush: 'post',
  },
)

// 父容器与视口相交
if (context) {
  const { isIntersecting } = useIntersectionObserver({
    target: context.box,
    threshold: [0],
    rootMargin: computed(() => {
      const marginTop = (props.marginTop || 0) - boundSize.height
      const marginBottom = (props.marginBottom || 0) - boundSize.height
      return `${marginTop}px 0px ${marginBottom}px`
    }),
  })

  watch([isIntersecting, targetRef, context.box], () => {
    const box = toValue(context.box)
    if (!box) return

    const boxRect = box.getBoundingClientRect()

    if (boxRect.top > window.innerHeight - boundSize.height + (props.marginBottom || 0)) {
      boundingBox.value = 'top'
    } else if (boxRect.bottom < boundSize.height - (props.marginTop || 0)) {
      boundingBox.value = 'bottom'
    } else {
      boundingBox.value = 'none'
    }
  })
}

defineExpose<StickyExpose>({})

const stickyStyle = computed(() => {
  return size.value
})

const fixationStyle = computed<StyleValue>(() => {
  return [
    size.value,
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
</script>
