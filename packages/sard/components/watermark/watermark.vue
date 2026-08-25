<template>
  <div :class="watermarkClass" :style="watermarkStyle"></div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { createBem, toArray, getRotatedRect, loadImage, imageDataToDataURL } from '../../utils'
import {
  type WatermarkProps,
  type WatermarkSlots,
  type WatermarkEmits,
  type WatermarkExpose,
  defaultWatermarkProps,
  defaultWatermarkFont,
} from './common'

const props = withDefaults(defineProps<WatermarkProps>(), defaultWatermarkProps)

defineSlots<WatermarkSlots>()

defineEmits<WatermarkEmits>()

const bem = createBem('watermark')

const offset = computed(() => {
  const [offsetX = props.gap[0] / 2, offsetY = props.gap[1] / 2] = props.offset || []
  return [offsetX, offsetY]
})

const mergedFont = computed(() => {
  return {
    ...defaultWatermarkFont,
    ...props.font,
  }
})

const dpr = window.devicePixelRatio

const canvasSize = 999
const canvas = document.createElement('canvas')
canvas.width = canvasSize
canvas.height = canvasSize
const context = canvas.getContext('2d')!

const backgroundSize = ref(0)
const backgroundImage = ref('')

const imageObj = shallowRef<HTMLImageElement | null>(null)
const naturalWidth = ref(0)
const naturalHeight = ref(0)
const imgFail = ref(false)

watch(
  () => props.image,
  () => {
    if (props.image) {
      loadImage(props.image)
        .then((image) => {
          imageObj.value = image
          naturalWidth.value = image.naturalWidth
          naturalHeight.value = image.naturalHeight
          imgFail.value = false
        })
        .catch(() => {
          imgFail.value = true
        })
    } else {
      imageObj.value = null
    }
  },
  {
    immediate: true,
  },
)

const drawWatermark = () => {
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, canvasSize, canvasSize)

  let width = 0
  let height = 0
  const widths: number[] = []

  let rotatedRect = { w1: 0, w2: 0, h1: 0, h2: 0, width: 0, height: 0 }

  const shouldDrawImage =
    imageObj.value !== null && !imgFail.value && naturalWidth.value > 0 && naturalHeight.value > 0

  if (shouldDrawImage) {
    rotatedRect = getRotatedRect(props.width, props.height, props.rotate)
  } else {
    const { fontSize, fontStyle, fontWeight, fontFamily, color } = mergedFont.value
    const textHeight = fontSize
    context.font = [fontStyle, fontWeight, fontSize + 'px', fontFamily].filter(Boolean).join(' ')
    context.fillStyle = color
    context.textBaseline = 'top'

    toArray(props.content)
      .filter(Boolean)
      .forEach((item) => {
        const metrics = context.measureText(item)
        widths.push(metrics.width)
        width = Math.max(width, metrics.width)
        height += textHeight
      })

    rotatedRect = getRotatedRect(width, height, props.rotate)
  }

  const draw = () => {
    context.save()

    let rotate = (((props.rotate % 360) + 540) % 360) - 180
    rotate = rotate === -180 ? 180 : rotate

    if (rotate < 0 && rotate >= -90) {
      context.translate(0, rotatedRect.h1)
    } else if (rotate < -90) {
      context.translate(rotatedRect.w2, rotatedRect.height)
    } else if (rotate >= 0 && rotate < 90) {
      context.translate(rotatedRect.w1, 0)
    } else {
      context.translate(rotatedRect.width, rotatedRect.h2)
    }
    context.rotate((rotate * Math.PI) / 180)

    if (shouldDrawImage) {
      context.drawImage(imageObj.value!, 0, 0, props.width, props.height)
    } else {
      const { fontSize, textAlign } = mergedFont.value
      const textHeight = fontSize

      toArray(props.content!)
        .filter(Boolean)
        .forEach((item, i) => {
          let x = 0
          switch (textAlign) {
            case 'left':
              x = 0
              break
            case 'center':
              x = (width - widths[i]) / 2
              break
            case 'right':
              x = width - widths[i]
              break
          }
          context.fillText(item, x, i * textHeight)
        })
    }

    context.restore()
  }

  const [columnGap, rowGap] = props.gap

  draw()

  context.translate(0, -rowGap - rotatedRect.height)
  draw()

  context.translate(rotatedRect.width + columnGap, (rotatedRect.height + rowGap) / 2)
  draw()

  context.translate(0, rowGap + rotatedRect.height)
  draw()

  const clipWidth = (rotatedRect.width + columnGap) * 2
  const clipHeight = rotatedRect.height + rowGap

  backgroundSize.value = clipWidth

  const imageData = context.getImageData(0, 0, clipWidth * dpr, clipHeight * dpr)
  backgroundImage.value = imageDataToDataURL(imageData)
}

watch(
  [
    imageObj,
    naturalWidth,
    naturalHeight,
    imgFail,
    () => props.content,
    () => props.font,
    () => props.gap,
    () => props.rotate,
    () => props.width,
    () => props.height,
  ],
  () => {
    drawWatermark()
  },
  {
    immediate: true,
    flush: 'post',
  },
)

// ============================ style ============================
const watermarkClass = computed(() => {
  return [bem.b()]
})

const watermarkStyle = computed(() => {
  const [offsetX, offsetY] = offset.value

  return [
    {
      top: `${offsetY}px`,
      left: `${offsetX}px`,
      width: `calc(100% - ${offsetX}px)`,
      height: `calc(100% - ${offsetY}px)`,
      backgroundSize: `${backgroundSize.value}px`,
      backgroundImage: `url(${backgroundImage.value})`,
      zIndex: props.zIndex,
    },
  ]
})

defineExpose<WatermarkExpose>({})
</script>
