<template>
  <span
    v-if="slots.reference"
    ref="referenceRef"
    style="display: contents"
    @click="onReferenceClick"
  >
    <slot name="reference"></slot>
  </span>

  <teleport to="body">
    <Motion name="wide-zoom">
      <div
        v-show="innerVisible"
        ref="popper"
        :class="popoverClass"
        :style="popoverStyle"
        v-bind="attrs"
      >
        <div :class="bem.e('content')">
          <slot></slot>
        </div>
        <div v-if="showArrow" :class="bem.e('arrow')" :style="arrowStyle"></div>
      </div>
    </Motion>
  </teleport>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUpdated,
  shallowRef,
  useAttrs,
  useModel,
  useTemplateRef,
  watch,
} from 'vue'
import { createBem } from '../../utils'
import { useClickOutside, usePopper, useZIndex } from '../../use'
import {
  type PopoverProps,
  type PopoverSlots,
  type PopoverEmits,
  defaultPopoverProps,
} from './common'
import Motion from '../motion/motion.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverProps>(), defaultPopoverProps)

const attrs = useAttrs()

const slots = defineSlots<PopoverSlots>()

const emit = defineEmits<PopoverEmits>()

const bem = createBem('popover')

// ============================ reference ============================
const referenceRef = useTemplateRef<HTMLElement>('referenceRef')
const elRef = shallowRef<Element | null>(null)

const syncElRef = () => {
  // 包裹元素使用 `display: contents`，自身不产生盒子、无法用于定位，
  // 因此取它的第一个子元素作为真正的参考元素。
  elRef.value = referenceRef.value?.firstElementChild ?? referenceRef.value
}

onMounted(syncElRef)
onUpdated(syncElRef)

const mergedRef = computed(() => {
  return props.reference || elRef.value
})

const onReferenceClick = () => {
  innerVisible.value = true
}

// ============================ visible ============================
const innerVisible = useModel(props, 'visible')
const popperRef = useTemplateRef('popper')

useClickOutside(
  popperRef,
  () => {
    innerVisible.value = false
  },
  () => innerVisible.value && props.outsideClosable,
)

// ============================ position ============================
const [popperPos, arrowPos] = usePopper(mergedRef, popperRef, innerVisible, {
  position: () => props.position,
  refGap: () => props.refGap,
  viewportGap: () => props.viewportGap,
  arrowSize: 15,
})

const popperStyle = computed(() => {
  return {
    top: popperPos.top + 'px',
    left: popperPos.left + 'px',
  }
})

const arrowStyle = computed(() => {
  return {
    top: arrowPos.top + 'px',
    insetInlineStart: arrowPos.left + 'px',
  }
})

// ============================ zIndex ============================
const [zIndex, increaseZIndex] = useZIndex()

watch(innerVisible, () => {
  if (innerVisible.value) {
    increaseZIndex()
  }
})

// ============================ style ============================
const popoverClass = computed(() => {
  return [bem.b(), bem.m(props.theme)]
})

const popoverStyle = computed(() => {
  return [
    {
      zIndex: zIndex.value,
      transformOrigin: `${arrowStyle.value.insetInlineStart} ${arrowStyle.value.top}`,
    },
    popperStyle.value,
  ]
})
</script>
