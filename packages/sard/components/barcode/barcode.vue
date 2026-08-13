<template>
  <div :class="barcodeClass" :style="barcodeStyle">
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import {
  type BarcodeLayoutSegment,
  barcode,
  calculateBarcodeLayout,
  createBem,
  measureTextWidth,
} from '../../utils'
import { defaultBarcodeProps, type BarcodeProps, type BarcodeEmits } from './common'

const props = withDefaults(defineProps<BarcodeProps>(), defaultBarcodeProps)

defineEmits<BarcodeEmits>()

const bem = createBem('barcode')

// main
const canvasRef = useTemplateRef('canvas')
const contextRef = computed(() => canvasRef.value?.getContext('2d'))
const dpr = window.devicePixelRatio
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const barcodeEncodings = computed(() => {
  if (!props.value) {
    return []
  }

  try {
    return barcode(props.value, {
      format: props.format,
      width: props.width,
      height: props.height,
      color: props.color,
      background: props.background,
      displayValue: props.displayValue,
      textPosition: props.textPosition,
      textAlign: props.textAlign,
      textMargin: props.textMargin,
      fontStyle: props.fontStyle,
      fontWeight: props.fontWeight,
      fontSize: props.fontSize,
      fontFamily: props.fontFamily,
      margin: props.margin,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
    })
  } catch {
    return []
  }
})

function drawBarcodeSegment(
  context: CanvasRenderingContext2D,
  xOffset: number,
  segment: BarcodeLayoutSegment,
) {
  const { options } = segment
  const yOffset =
    options.textPosition === 'top' && options.displayValue
      ? options.marginTop + options.fontSize + options.textMargin
      : options.marginTop

  context.fillStyle = options.lineColor

  for (let index = 0; index < segment.data.length; index++) {
    const bar = segment.data[index]
    const ratio = Number(bar)

    if (!ratio) {
      continue
    }

    context.fillRect(
      xOffset + segment.barcodePadding + index * options.width,
      yOffset,
      options.width,
      options.height * ratio,
    )
  }
}

function drawBarcodeText(
  context: CanvasRenderingContext2D,
  xOffset: number,
  segment: BarcodeLayoutSegment,
) {
  const { options } = segment

  if (!options.displayValue || !segment.text) {
    return
  }

  const { fontStyle, fontWeight, fontSize, fontFamily } = options

  context.font = [fontStyle, fontWeight, fontSize + 'px', fontFamily].filter(Boolean).join(' ')

  context.fillStyle = options.lineColor
  context.textBaseline = 'top'
  context.textAlign = 'left'

  let textX = xOffset
  if (options.textAlign === 'center') {
    textX += (segment.width - segment.textWidth) / 2
  } else if (options.textAlign === 'right') {
    textX += segment.width - segment.textWidth
  }

  const textY =
    options.textPosition === 'top'
      ? options.marginTop
      : options.marginTop + options.height + options.textMargin

  context.fillText(segment.text, textX, textY)
}

const drawBarcode = async () => {
  const context = contextRef.value
  const canvas = canvasRef.value
  if (!context || !canvas) {
    return
  }

  if (!barcodeEncodings.value.length) {
    return
  }

  const layout = calculateBarcodeLayout(barcodeEncodings.value, (text, options) =>
    measureTextWidth(context, text, options),
  )

  const nextCanvasWidth = layout.width * dpr
  const nextCanvasHeight = layout.height * dpr

  if (canvasWidth.value !== nextCanvasWidth || canvasHeight.value !== nextCanvasHeight) {
    canvasWidth.value = nextCanvasWidth
    canvasHeight.value = nextCanvasHeight
    await nextTick()
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  context.fillStyle = props.background
  context.fillRect(0, 0, canvasWidth.value, canvasHeight.value)

  let xOffset = layout.segments[0]?.options.marginLeft ?? 0

  layout.segments.forEach((segment) => {
    drawBarcodeSegment(context, xOffset, segment)
    drawBarcodeText(context, xOffset, segment)
    xOffset += segment.width
  })
}

watch(
  [
    contextRef,
    () => props.value,
    () => props.format,
    () => props.width,
    () => props.height,
    () => props.color,
    () => props.background,
    () => props.displayValue,
    () => props.textPosition,
    () => props.textAlign,
    () => props.textMargin,
    () => props.fontStyle,
    () => props.fontWeight,
    () => props.fontSize,
    () => props.fontFamily,
    () => props.margin,
    () => props.marginTop,
    () => props.marginBottom,
    () => props.marginLeft,
    () => props.marginRight,
  ],
  () => {
    drawBarcode()
  },
  {
    flush: 'post',
  },
)

// others
const barcodeClass = computed(() => {
  return [bem.b()]
})

const barcodeStyle = computed(() => {
  return {
    width: canvasWidth.value / dpr + 'px',
    height: canvasHeight.value / dpr + 'px',
  }
})
</script>
