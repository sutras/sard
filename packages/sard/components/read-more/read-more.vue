<template>
  <div :class="readMoreClass">
    <div ref="content" :class="bem.e('content')" :style="contentStyle">
      <slot></slot>
      <div :class="bem.e('shadow')"></div>
    </div>
    <div
      v-if="!hideToggle"
      ref="toggle"
      :class="bem.e('toggle')"
      @touchstart="onTouchStart"
      @pointerdown="onPointerDown"
    >
      <Button :class="bem.e('toggle-btn')" variant="link" @click="onButtonClick">
        <span>{{ toggleText }}</span>
        <Up v-if="innerVisible" />
        <Down v-else />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type ReadMoreProps,
  type ReadMoreSlots,
  type ReadMoreEmits,
  type ReadMoreExpose,
  defaultReadMoreProps,
} from './common'
import Button from '../button/button.vue'
import { useTranslateWithPrefix } from '../../locale'
import { usePointerDown } from '../../use'
import { Down, Up } from '@sard/icons'

const props = withDefaults(defineProps<ReadMoreProps>(), defaultReadMoreProps)

defineSlots<ReadMoreSlots>()

const emit = defineEmits<ReadMoreEmits>()

const bem = createBem('read-more')

const { t } = useTranslateWithPrefix('readMore')

// ============================ visible ============================
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const handleClick = () => {
  innerVisible.value = !innerVisible.value

  emit('update:visible', innerVisible.value)

  if (innerVisible.value) {
    emit('open')
  } else {
    onClose()
    emit('close')
  }
}

const onButtonClick = () => {
  handleClick()
}

const toggleText = computed(() => {
  return innerVisible.value ? props.openText || t('fold') : props.closeText || t('unfold')
})

const hideToggle = computed(() => {
  return innerVisible.value && props.hideClose
})

// ============================ scroll ============================
const contentRef = useTemplateRef('content')
const toggleRef = useTemplateRef('toggle')

let scrollTop = 0

const onTouchStart = (event: TouchEvent) => {
  if (props.keepLocation && innerVisible.value) {
    const { clientY, pageY } = event.touches[0]
    const contentRect = contentRef.value!.getBoundingClientRect()
    const toggleRect = toggleRef.value!.getBoundingClientRect()

    const closeContentHeight = Math.min(props.maxHeight, contentRect.height)
    const openContentHeight = contentRect.height
    const offsetTop = clientY - toggleRect.top
    const openContentPageY = pageY - offsetTop - openContentHeight
    const closeContentClientY = toggleRect.top - closeContentHeight
    scrollTop = openContentPageY - closeContentClientY
  }
}

const onPointerDown = usePointerDown(onTouchStart, undefined, undefined)

const onClose = () => {
  if (props.keepLocation) {
    window.scrollTo({
      top: scrollTop,
      behavior: 'instant',
    })
  }
}

// ============================ style ============================

const readMoreClass = computed(() => {
  return [bem.b(), bem.m('close', !innerVisible.value)]
})

const contentStyle = computed(() => {
  return {
    maxHeight: innerVisible.value ? 'none' : props.maxHeight + 'px',
  }
})

defineExpose<ReadMoreExpose>({})
</script>
