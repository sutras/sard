<template>
  <div :class="slideVerifyClass" :style="slideVerifyStyle">
    <div ref="track" :class="bem.e('track')">
      <span :class="bem.e('track-text')">
        {{ text }}
      </span>
    </div>
    <div :class="bem.e('valid-track')">
      <div :class="bem.e('fill')">
        {{ fillText }}
      </div>
      <div
        :class="bem.e('thumb')"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @pointerdown="onPointerDown"
      >
        <DoubleRight v-if="status & STATUS.INITIAL" :class="bem.e('arrow')" />
        <Loading v-else-if="status & STATUS.LOADING" />
        <CheckCircleFill v-else-if="status & STATUS.SUCCESS" />
        <XCircleFill v-else-if="status & STATUS.ERROR" />
      </div>
      <div v-if="showTarget" :class="bem.e('target')"></div>
    </div>
    <div :class="bem.e('fulfill')">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem, clamp } from '../../utils'
import {
  type SlideVerifyProps,
  type SlideVerifySlots,
  type SlideVerifyEmits,
  type SlideVerifyExpose,
  type SlideVerifyResult,
  defaultSlideVerifyProps,
} from './common'
import Loading from '../loading/loading.vue'
import { usePointerDown, useRtl } from '../../use'
import { CheckCircleFill, DoubleRight, XCircleFill } from '@sard/icons'

const props = withDefaults(defineProps<SlideVerifyProps>(), defaultSlideVerifyProps)

defineSlots<SlideVerifySlots>()

const emit = defineEmits<SlideVerifyEmits>()

const bem = createBem('slide-verify')

enum STATUS {
  INITIAL = 1 << 0,
  LOADING = 1 << 1,
  SUCCESS = 1 << 2,
  ERROR = 1 << 3,
}

const status = ref<STATUS>(STATUS.INITIAL)

const fillText = computed(() => {
  switch (status.value) {
    case STATUS.SUCCESS:
      return props.successText
    case STATUS.ERROR:
      return props.errorText
    default:
      return ''
  }
})

const percent = ref(0)
const trackPercent = ref(0)

const targetPos = computed(() => {
  return clamp(props.targetPos ?? 100, 0, 100)
})

const reset = () => {
  status.value = STATUS.INITIAL
  percent.value = 0
  trackPercent.value = 0
}

const trackRef = useTemplateRef('track')

const isRtl = useRtl(trackRef)

const isDown = ref(false)
let startX = 0
let trackRect: DOMRect
let trajectory: [x: number, y: number, t: number][] = []
let startTime = 0

const onTouchStart = async (event: TouchEvent) => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }
  isDown.value = true

  const { clientX, clientY } = event.touches[0]

  startTime = Date.now()

  trajectory.push([clientX, clientY, startTime])

  startX = clientX

  emit('start', event)

  trackRect = trackRef.value!.getBoundingClientRect()
}

const onTouchMove = (event: TouchEvent) => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }
  if (!trackRect) return

  const { clientX, clientY } = event.touches[0]

  trajectory.push([clientX, clientY, Date.now()])

  let deltaX = clientX - startX

  if (isRtl.value) {
    deltaX = -deltaX
  }

  const { width, height } = trackRect

  const total = width - height

  const x = clamp(deltaX, 0, total)
  percent.value = (x / total) * 100
  trackPercent.value = (x / width) * 100

  emit('move', event)
}

const MIN_DISTANCE = 10

const onTouchEnd = async (event: TouchEvent) => {
  if (props.disabled || !(status.value & STATUS.INITIAL)) {
    return
  }
  if (Math.abs(event.changedTouches[0].clientX - startX) < MIN_DISTANCE) {
    reset()
    return
  }

  isDown.value = false

  const data: SlideVerifyResult = {
    actualPos: percent.value,
    targetPos: targetPos.value,
    startTime,
    endTime: Date.now(),
    trajectory,
  }

  trajectory = []

  emit('end', event)

  try {
    status.value = STATUS.LOADING
    const result = await props.verify?.(data)
    if (!result) {
      throw new Error()
    }
    status.value = STATUS.SUCCESS
  } catch {
    status.value = STATUS.ERROR

    if (props.resetWhenError) {
      reset()
    }
  }
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

watch(percent, () => {
  emit('change', percent.value)
})

// ============================ style ============================

const slideVerifyClass = computed(() => {
  return [
    bem.b(),
    bem.m('down', isDown.value),
    bem.m('success', status.value & STATUS.SUCCESS),
    bem.m('error', status.value & STATUS.ERROR),
    bem.m('loading', status.value & STATUS.LOADING),
  ]
})

const slideVerifyStyle = computed(() => {
  return {
    '--valid-track-x': percent.value + '%',
    '--track-x': trackPercent.value + '%',
    '--target-x': targetPos.value + '%',
  }
})

defineExpose<SlideVerifyExpose>({ reset })
</script>
