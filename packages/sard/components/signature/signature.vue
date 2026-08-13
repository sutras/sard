<template>
  <teleport to="body" :disabled="!fullScreen">
    <Motion :disalbed="!fullScreen" name="fade" @before-enter="onBeforeEnter">
      <div v-show="!fullScreen || innerVisible" :class="signatureClass" :style="signatureStyle">
        <div :class="bem.e('body')">
          <canvas
            ref="canvas"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @pointerdown="onPointerDown"
          ></canvas>
        </div>

        <div ref="footer" :class="bem.e('footer')">
          <div :class="bem.e('footer-content')" :style="footerContentStyle">
            <slot></slot>
            <div :class="bem.e('button-group')">
              <Button v-if="fullScreen" size="small" variant="filled" @click="cancel">
                {{ cancelText || t('cancel') }}
              </Button>
              <Button size="small" variant="filled" @click="clear">
                {{ clearText || t('clear') }}
              </Button>
              <Button size="small" @click="confirm">
                {{ confirmText || t('confirm') }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef, useModel } from 'vue'
import { createBem } from '../../utils'
import {
  type SignatureProps,
  type SignatureSlots,
  type SignatureEmits,
  type SignatureExpose,
  defaultSignatureProps,
} from './common'
import Button from '../button/button.vue'
import { usePointerDown, useResizeObserver, useZIndex } from '../../use'
import { useTranslateWithPrefix } from '../../locale'
import Motion from '../motion/motion.vue'

const props = withDefaults(defineProps<SignatureProps>(), defaultSignatureProps)

defineSlots<SignatureSlots>()

const emit = defineEmits<SignatureEmits>()

const bem = createBem('signature')

const { t } = useTranslateWithPrefix('signature')

// visible
const innerVisible = useModel(props, 'visible')

const [zIndex, increaseZIndex] = useZIndex()

const onBeforeEnter = () => {
  increaseZIndex()
}

// canvas
const dpr = window.devicePixelRatio

const canvasRef = useTemplateRef('canvas')
const contextRef = computed(() => canvasRef.value?.getContext('2d'))

let covertCanvas: HTMLCanvasElement | null = null
let covertContext: CanvasRenderingContext2D | null = null

useResizeObserver(canvasRef, ({ width, height }) => {
  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = width * dpr
    canvas.height = height * dpr
    initialCanvas()
  }
})

let prevPoints: [number, number] = [0, 0]

let isEmpty = true

// ========================== touch event =========================
const onTouchStart = (event: TouchEvent) => {
  event.preventDefault()

  const canvas = canvasRef.value!
  const context = contextRef.value!

  const rect = canvas.getBoundingClientRect()
  const touch = event.touches[0]
  const x = touch.clientX - rect.x
  const y = touch.clientY - rect.y

  context.setTransform(dpr, 0, 0, dpr, 0, 0)

  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = props.lineWidth
  context.strokeStyle = props.color

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x, y)
  prevPoints = [x, y]
  context.stroke()

  isEmpty = false
}

const onTouchMove = (event: TouchEvent) => {
  const canvas = canvasRef.value!
  const context = contextRef.value!

  const rect = canvas.getBoundingClientRect()
  const touch = event.touches[0]
  const x = touch.clientX - rect.x
  const y = touch.clientY - rect.y

  context.moveTo(...prevPoints)
  context.lineTo(x, y)
  prevPoints = [x, y]
  context.stroke()
}

const onTouchEnd = () => {
  const context = contextRef.value!

  context.closePath()
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

// ======================= get canvas info =======================

const getCanvasDataURL = () => {
  return canvasRef.value!.toDataURL(props.type, props.quality)
}

const drawCovertCanvas = () => {
  if (!covertCanvas) {
    covertCanvas = document.createElement('canvas')
  }
  if (!covertContext) {
    covertContext = covertCanvas.getContext('2d')
  }
  if (!covertContext) return

  const canvas = canvasRef.value!

  covertCanvas.width = canvas.height
  covertCanvas.height = canvas.width

  covertContext.clearRect(0, 0, covertCanvas.width, covertCanvas.height)
  covertContext.save()
  covertContext.translate(0, covertCanvas.height)
  covertContext.rotate(-Math.PI / 2)
  covertContext.drawImage(canvas, 0, 0)
  covertContext.restore()
}

const getCovertCanvasDataURL = () => {
  drawCovertCanvas()
  return covertCanvas!.toDataURL(props.type, props.quality)
}

// ========================= methods =========================
const initialCanvas = () => {
  const context = contextRef.value
  const canvas = canvasRef.value

  if (context && canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (props.background) {
      context.fillStyle = props.background
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  isEmpty = true
}

const clear = () => {
  initialCanvas()
  emit('clear')
}

const confirm = () => {
  const dataURL = isEmpty ? '' : props.fullScreen ? getCovertCanvasDataURL() : getCanvasDataURL()
  emit('confirm', dataURL)
  if (props.fullScreen) {
    close()
  }
}

const close = () => {
  initialCanvas()
  innerVisible.value = false
}

const cancel = () => {
  close()
  emit('cancel')
}

// footer content size
const footerRef = useTemplateRef('footer')
const footerSize = useResizeObserver(footerRef, undefined, () => !props.fullScreen)
const footerContentStyle = computed(() => {
  if (props.fullScreen) {
    return {
      width: footerSize.height + 'px',
      height: footerSize.width + 'px',
    }
  }
  return null
})

const signatureClass = computed(() => {
  return [bem.b(), bem.m('full', props.fullScreen)]
})

const signatureStyle = computed(() => {
  return {
    zIndex: props.fullScreen && innerVisible.value ? zIndex.value : '',
  }
})

defineExpose<SignatureExpose>({
  clear,
  confirm,
})
</script>
