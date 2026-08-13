<template>
  <div :class="noticeBarClass" :style="noticeBarStyle" @click="onClick">
    <div v-if="!hideLeftIcon" :class="bem.e('left-icon')">
      <slot name="left-icon">
        <VolumeUp />
      </slot>
    </div>
    <div ref="content" :class="bem.e('content')">
      <div
        ref="wrapper"
        :class="bem.e('wrapper')"
        :style="wrapperStyle"
        @animationend="onAnimationEnd"
      >
        <slot></slot>
      </div>
    </div>
    <div v-if="closable || linkable" :class="bem.e('right-icon')" @click="onRightIconClick">
      <slot name="right-icon">
        <Close v-if="closable" />
        <Right v-else-if="linkable" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, useTemplateRef, onBeforeUnmount } from 'vue'
import { createBem, throttle } from '../../utils'
import {
  type NoticeBarProps,
  type NoticeBarSlots,
  type NoticeBarEmits,
  defaultNoticeBarProps,
} from './common'
import { useResizeObserver } from '../../use'
import { Close, Right, VolumeUp } from '@sard/icons'

const props = withDefaults(defineProps<NoticeBarProps>(), defaultNoticeBarProps)

defineSlots<NoticeBarSlots>()

const emit = defineEmits<NoticeBarEmits>()

const bem = createBem('notice-bar')

// main
const contentRef = useTemplateRef('content')
const wrapperRef = useTemplateRef('wrapper')
const shouldScroll = ref(false)
const wrapperData = ref({
  first: 0,
  later: 0,
  contentWidth: 0,
})

const getWidth = (el: HTMLElement) => {
  return el.getBoundingClientRect().width
}

const firstLap = ref(true)

const onAnimationEnd = (event: AnimationEvent) => {
  if (event.target === wrapperRef.value) {
    if (firstLap.value) {
      firstLap.value = false
    }
  }
}

const update = throttle(
  () => {
    if (props.scrollable === 'never') {
      shouldScroll.value = false
      return
    }

    const contentWidth = getWidth(contentRef.value!)
    const wrapperWidth = getWidth(wrapperRef.value!)

    const nextShouldScroll = props.scrollable === 'always' || wrapperWidth > contentWidth

    if (nextShouldScroll) {
      wrapperData.value = {
        first: (wrapperWidth / props.speed) * 1000,
        later: ((wrapperWidth + contentWidth) / props.speed) * 1000,
        contentWidth,
      }
    } else {
      firstLap.value = true
    }

    shouldScroll.value = nextShouldScroll
  },
  50,
  {
    leading: false,
  },
)

onMounted(() => {
  update()
})

onBeforeUnmount(() => {
  update.cancel()
})

useResizeObserver(wrapperRef, () => {
  update()
})

useResizeObserver(contentRef, () => {
  update()
})

// visible
const innerVisible = ref(props.visible)
const onRightIconClick = () => {
  if (props.closable) {
    innerVisible.value = false
    emit('close')
  }
}

// others
const onClick = (event: MouseEvent) => {
  emit('click', event)
}

const noticeBarClass = computed(() => {
  return [
    bem.b(),
    bem.m('wrap', props.wrap),
    bem.m('vertical', props.vertical),
    bem.m('linkable', props.linkable),
    bem.m('infinite', !firstLap.value),
    bem.m('scrollable', shouldScroll.value),
  ]
})

const noticeBarStyle = computed(() => {
  return {
    color: props.color,
    background: props.background,
    display: innerVisible.value ? '' : 'none',
  }
})

const wrapperStyle = computed(() => {
  return {
    '--x': `${firstLap.value ? 0 : wrapperData.value.contentWidth}px`,
    '--duration': `${firstLap.value ? wrapperData.value.first : wrapperData.value.later}ms`,
  }
})
</script>
