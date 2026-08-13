<template>
  <div ref="container" :class="qrcodeClass" :style="qrcodeStyle">
    <canvas ref="canvas" :width="canvasSize" :height="canvasSize"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import { createBem, loadImage, qrcode } from '../../utils'
import { defaultQrcodeProps, type QrcodeProps, type QrcodeEmits } from './common'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<QrcodeProps>(), defaultQrcodeProps)

defineEmits<QrcodeEmits>()

const bem = createBem('qrcode')

// main
const canvasRef = useTemplateRef('canvas')
const contextRef = computed(() => canvasRef.value?.getContext('2d'))
const dpr = window.devicePixelRatio

const container = useTemplateRef('container')
const containerSize = useResizeObserver(container)

const canvasSize = computed(() => {
  return containerSize.width * dpr
})

const qrcodeMap = computed(() => {
  return qrcode(props.text, {
    ecl: props.ecl as QrcodeProps['ecl'],
  })
})

const drawQrcode = async () => {
  const context = contextRef.value
  const size = canvasSize.value

  if (!context || !size) {
    return
  }

  const map = qrcodeMap.value
  const moduleSize = size / (map.length + props.quietZoneModules * 2)
  const margin = moduleSize * props.quietZoneModules

  const path = new Path2D()

  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        path.rect(
          colIndex * moduleSize + margin,
          rowIndex * moduleSize + margin,
          moduleSize,
          moduleSize,
        )
      }
    })
  })

  context.clearRect(0, 0, size, size)
  context.fillStyle = props.bgColor
  context.fillRect(0, 0, size, size)
  context.fillStyle = props.color
  context.fill(path)

  await drawIcon(context)
}

const drawIcon = async (ctx: any) => {
  if (props.icon) {
    const image = await loadImage(props.icon)

    const size = canvasSize.value
    ctx.save()
    ctx.beginPath()
    ctx.drawImage(image, size * 0.4, size * 0.4, size * 0.2, size * 0.2)
    ctx.restore()
  }
}

watch(
  [
    contextRef,
    qrcodeMap,
    canvasSize,
    () => props.color,
    () => props.bgColor,
    () => props.quietZoneModules,
    () => props.icon,
  ],
  () => {
    drawQrcode()
  },
  {
    flush: 'post',
  },
)

// others
const qrcodeClass = computed(() => {
  return [bem.b()]
})

const qrcodeStyle = computed(() => {
  return [
    {
      width: props.size,
      height: props.size,
    },
  ]
})
</script>
