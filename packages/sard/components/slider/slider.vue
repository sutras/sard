<template>
  <div :class="sliderClass" @click="onSliderClick">
    <div
      ref="track"
      :class="bem.e('track')"
      :style="{
        width: vertical ? trackSize : '',
        height: !vertical ? trackSize : '',
        backgroundColor: trackColor,
      }"
    >
      <div :class="bem.e('fill')" :style="fillStyle">
        <div
          v-if="range"
          :class="[bem.e('thumb-container'), bem.em('thumb-container', 'start')]"
          @touchstart.stop.prevent="onTouchStart($event, 0)"
          @touchmove.stop.prevent="onTouchMove($event, 0)"
          @touchend="onTouchEnd($event)"
          @touchcancel="onTouchEnd($event)"
          @pointerdown="onPointerDown0"
          @click.stop="onThumbClick"
        >
          <slot name="start-thumb" :value="rangeValue[0]">
            <div :class="bem.e('thumb')" :style="thumbStyle"></div>
          </slot>
          <div v-if="showValue" :class="valueClass" :style="valueStyle">
            {{ rangeValue[0] }}
          </div>
        </div>
        <div
          :class="[bem.e('thumb-container'), bem.em('thumb-container', 'end')]"
          @touchstart.stop.prevent="onTouchStart($event, 1)"
          @touchmove.stop.prevent="onTouchMove($event, 1)"
          @touchend="onTouchEnd($event)"
          @touchcancel="onTouchEnd($event)"
          @pointerdown="onPointerDown1"
          @click.stop="onThumbClick"
        >
          <slot name="end-thumb" :value="rangeValue[1]">
            <div :class="bem.e('thumb')" :style="thumbStyle"></div>
          </slot>
          <div v-if="showValue" :class="valueClass" :style="valueStyle">
            {{ rangeValue[1] }}
          </div>
        </div>
      </div>
      <template v-if="showScale">
        <div
          v-for="(scale, i) in scales"
          :key="i"
          :class="[bem.e('scale'), bem.em('scale', 'active', scale.active)]"
          :style="scale.style"
        >
          <div :class="bem.e('scale-text')">{{ scale.value }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem, clamp, mround, arrayEqual, toArray } from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import { type SliderProps, type SliderSlots, type SliderEmits, defaultSliderProps } from './common'
import { usePointerDown, useRtl } from '../../use'

const props = withDefaults(defineProps<SliderProps>(), defaultSliderProps)

defineSlots<SliderSlots>()

const emit = defineEmits<SliderEmits>()

const bem = createBem('slider')

const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const innerValue = ref<number | number[]>(
  props.modelValue ?? (props.range ? [props.min, props.min] : props.min),
)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue ?? (props.range ? [props.min, props.min] : props.min)

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const trackRef = useTemplateRef('track')
let trackRect: DOMRect
let downValue: number | number[]
let moveValue: number | number[]
let downRatio = 0
let triggerMove = false

const isRtl = useRtl(trackRef)

const onThumbClick = () => {}

const onSliderClick = (event: MouseEvent | TouchEvent) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  const { clientY, clientX } = 'touches' in event ? event.touches[0] : event

  trackRect = trackRef.value!.getBoundingClientRect()

  const trackSize = props.vertical ? trackRect.height : trackRect.width
  const tapCoord = props.vertical ? clientY : clientX
  const startCoord = props.vertical ? trackRect.top : isRtl.value ? trackRect.right : trackRect.left
  let offset = tapCoord - startCoord
  if (isRtl.value) {
    offset *= -1
  }

  const ratio = offset / trackSize
  const total = props.max - props.min
  const tapValue = clamp(mround(props.min + total * ratio, props.step), props.min, props.max)

  let nextValue: number | number[] | undefined

  if (Array.isArray(innerValue.value)) {
    const [start, end] = innerValue.value

    if (Math.abs(tapValue - end) <= Math.abs(tapValue - start)) {
      if (tapValue !== innerValue.value[1]) {
        nextValue = [start, tapValue]
      }
    } else {
      if (tapValue !== innerValue.value[0]) {
        nextValue = [tapValue, end]
      }
    }
  } else {
    if (tapValue !== innerValue.value) {
      nextValue = tapValue
    }
  }

  if (nextValue !== undefined) {
    innerValue.value = nextValue
    emit('update:modelValue', nextValue)
    emit('input', nextValue)
    emit('change', nextValue)
  }
}

let downCoord = {
  x: 0,
  y: 0,
}

const onTouchStart = (event: TouchEvent, index: number) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  downCoord = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }

  trackRect = trackRef.value!.getBoundingClientRect()

  const thumbValue = Array.isArray(innerValue.value) ? innerValue.value[index] : innerValue.value

  downRatio = (thumbValue - props.min) / (props.max - props.min)
  downValue = innerValue.value
  moveValue = innerValue.value
}

const onTouchMove = (event: TouchEvent, index: number) => {
  if (isDisabled.value || isReadonly.value) {
    return
  }

  if (!triggerMove) {
    triggerMove = true
    emit('drag-start', event)
  }

  if (!trackRect) {
    return
  }

  let deltaX = event.touches[0].clientX - downCoord.x
  if (isRtl.value) {
    deltaX *= -1
  }
  const deltaY = event.touches[0].clientY - downCoord.y

  const trackSize = props.vertical ? trackRect.height : trackRect.width
  const delta = props.vertical ? deltaY : deltaX
  const ratio = delta / trackSize + downRatio
  const total = props.max - props.min
  const tapValue = clamp(mround(props.min + total * ratio, props.step), props.min, props.max)

  let nextValue: number | number[]

  if (Array.isArray(downValue)) {
    const [start, end] = downValue

    if (index === 1) {
      nextValue = tapValue < start ? [tapValue, start] : [start, tapValue]
    } else {
      nextValue = tapValue > end ? [end, tapValue] : [tapValue, end]
    }
  } else {
    nextValue = tapValue
  }

  if (!arrayEqual(toArray(nextValue), toArray(moveValue))) {
    moveValue = nextValue

    innerValue.value = nextValue
    emit('update:modelValue', nextValue)
    emit('input', nextValue)
  }
}

const onTouchEnd = (event: TouchEvent) => {
  triggerMove = false

  if (isDisabled.value || isReadonly.value) {
    return
  }

  emit('drag-end', event)

  if (!arrayEqual(toArray(downValue), toArray(innerValue.value))) {
    emit('change', innerValue.value)
  }
}

const onPointerDown0 = usePointerDown(
  (event) => {
    event.stopPropagation()
    onTouchStart(event, 0)
  },
  (event) => onTouchMove(event, 0),
)

const onPointerDown1 = usePointerDown(
  (event) => {
    event.stopPropagation()
    onTouchStart(event, 1)
  },
  (event) => onTouchMove(event, 1),
)

const rangeValue = computed(() => {
  let startValue: number
  let endValue: number

  if (Array.isArray(innerValue.value)) {
    startValue = innerValue.value[0]
    endValue = innerValue.value[1]
  } else {
    startValue = props.min
    endValue = innerValue.value
  }
  return [startValue, endValue]
})

const rangePercent = computed(() => {
  const startRatio = (rangeValue.value[0] - props.min) / (props.max - props.min)
  const endRatio = (rangeValue.value[1] - props.min) / (props.max - props.min)
  const startPercent = startRatio * 100 + '%'
  const endPercent = (endRatio - startRatio) * 100 + '%'

  return [startPercent, endPercent]
})

// ============================ scale ============================
const scales = computed(() => {
  if (!props.showScale) {
    return []
  }

  const total = props.max - props.min
  const direction = props.vertical ? 'top' : 'inset-inline-start'
  const scales = [
    {
      value: props.min,
      style: {
        [direction]: '0%',
      },
      active: props.min === rangeValue.value[0],
    },
  ]
  let scale = props.min

  do {
    scale += props.step
    if (scale > props.max) {
      scale = props.max
    }
    scales.push({
      value: scale,
      style: {
        [direction]: ((scale - props.min) / total) * 100 + '%',
      },
      active: scale >= rangeValue.value[0] && scale <= rangeValue.value[1],
    })
  } while (scale < props.max)

  return scales
})

// ============================ style ============================
const sliderClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.vertical ? 'vertical' : 'horizontal'),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m('show-scale', props.showScale),
    bem.m(`scale-${props.scalePosition ?? (props.vertical ? 'left' : 'bottom')}`, props.showScale),
  ]
})

const thumbStyle = computed(() => {
  return {
    width: props.thumbSize,
    height: props.thumbSize,
    backgroundColor: props.thumbColor,
  }
})

const fillStyle = computed(() => {
  return {
    [props.vertical ? 'top' : 'inset-inline-start']: rangePercent.value[0],
    [props.vertical ? 'height' : 'width']: rangePercent.value[1],
    backgroundColor: props.color,
  }
})

const valueClass = computed(() => {
  return [
    bem.e('value'),
    bem.em('value', props.valuePosition ?? (props.vertical ? 'right' : 'top')),
  ]
})

const valueStyle = computed(() => {
  return {
    backgroundColor: props.valueBackground,
    color: props.valueColor,
  }
})
</script>
