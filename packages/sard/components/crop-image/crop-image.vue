<template>
  <Popup
    effect="full-fade"
    :visible="visible"
    :overlay="false"
    :close-on-back-press="closeOnBackPress"
    @back-press="onBackPress"
    @visible-hook="onVisibleHook"
  >
    <div :class="cropImageClass">
      <div
        :class="bem.e('sensor')"
        @pointerdown="onPointerDown"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <div :class="bem.e('focus')" :style="focusStyle">
          <div :class="bem.e('puppet')" :style="puppetStyle">
            <img
              v-if="imageOrigSize[0] > 0"
              :src="url"
              :class="bem.e('image')"
              :style="imageStyle"
            />
          </div>
        </div>
      </div>
      <div :class="bem.e('mask')" :style="maskStyle"></div>

      <div :class="bem.e('toolbar')">
        <Button
          :class="bem.e('cancel')"
          size="small"
          variant="link"
          color="white"
          block
          @click="onCancel"
        >
          {{ cancelText || t('cancel') }}
        </Button>
        <Button size="small" variant="link" color="white" block @click="onReset">
          <Undo :class="bem.e('action-icon')" />
        </Button>
        <Button size="small" variant="link" color="white" block @click="onRotate">
          <RotateLeft :class="bem.e('action-icon')" />
        </Button>
        <Button :class="bem.e('confirm')" size="small" block @click="onConfirm">
          {{ confirmText || t('confirm') }}
        </Button>
      </div>
    </div>

    <div v-if="isCropping" :class="bem.e('loading')">
      <Loading />
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import {
  createBem,
  getAspectFillSize,
  getAspectFitSize,
  createInertialAnimate,
  logError,
  loadImage,
} from '../../utils'
import {
  type CropImageProps,
  type CropImageSlots,
  type CropImageEmits,
  type CropImageExpose,
  defaultCropImageProps,
} from './common'
import { useDragPinch, usePointerDown, useTimeout } from '../../use'
import { useTranslateWithPrefix } from '../../locale'
import Popup from '../popup/popup.vue'
import Button from '../button/button.vue'
import Loading from '../loading/loading.vue'
import { RotateLeft, Undo } from '@sard/icons'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<CropImageProps>(), defaultCropImageProps)

defineSlots<CropImageSlots>()

const emit = defineEmits<CropImageEmits>()

const bem = createBem('crop-image')

const { t } = useTranslateWithPrefix('signature')

// ============================ visible ============================
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const close = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

const onBackPress = () => {
  close()
}

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit('visible-hook', name, el)
  emit(name as any, el)
}

// ============================ focus & mask ============================
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

const aspectRatio = computed(() => {
  const [w, h] = props.cropScale.split(':').map(Number)
  return [w, h] as const
})

const minGapY = (windowWidth / 750) * 128
const minGapX = 20

const focusRect = computed(() => {
  const maxWidth = windowWidth - minGapX * 2
  const maxHeight = windowHeight - minGapY * 2

  const [width, height] = getAspectFitSize(...aspectRatio.value, maxWidth, maxHeight)

  const left = (windowWidth - width) / 2
  const top = (windowHeight - height) / 2

  return [left, top, width, height] as const
})

const rotate = ref(0)

const actualRotate = ref(0)

const rotateTimer = useTimeout()

watch(rotate, () => {
  rotateTimer.set(() => {
    actualRotate.value = rotate.value
  }, 150 + 100)
})

const isRotating = computed(() => rotate.value !== actualRotate.value)

const isStillRotating = ref(false)

const rotatingTimer = useTimeout()

watch(isRotating, () => {
  rotatingTimer.clear()

  if (isRotating.value) {
    isStillRotating.value = true
  } else {
    rotatingTimer.set(() => {
      isStillRotating.value = false
    }, 150)
  }
})

const maskStyle = computed(() => {
  const [left, top, width, height] = focusRect.value

  return {
    left: left + 'px',
    top: top + 'px',
    width: width + 'px',
    height: height + 'px',
  }
})

const focusStyle = computed(() => {
  return {
    ...maskStyle.value,
    transition: isRotating.value ? '' : 'none',
    transform: `rotate(${rotate.value - actualRotate.value}deg)`,
  }
})

// ============================ image & puppet ============================
const imageOrigSize = ref<[number, number]>([0, 0])

watch(
  () => props.url,
  (url) => {
    imageOrigSize.value = [0, 0]
    rotate.value = 0
    actualRotate.value = 0
    isStillRotating.value = false

    if (url) {
      loadImage(url).then((image) => {
        imageOrigSize.value = [image.naturalWidth, image.naturalHeight]
      })
    }
  },
  {
    immediate: true,
  },
)

const imageCoverSize = ref<[number, number]>([0, 0])

watch(
  imageOrigSize,
  () => {
    const [, , width, height] = focusRect.value
    imageCoverSize.value = getAspectFillSize(...imageOrigSize.value, width, height)
  },
  {
    immediate: true,
  },
)

const reversedCoverSize = computed(() => {
  const size = [...imageCoverSize.value]
  return actualRotate.value % 180 !== 0 ? size.reverse() : size
})

const imgLeft = ref(0)
const imgTop = ref(0)
const imgWidth = ref(0)
const imgHeight = ref(0)

watch(
  imageCoverSize,
  ([width, height]) => {
    imgWidth.value = width
    imgHeight.value = height
    imgLeft.value = 0
    imgTop.value = 0
  },
  {
    immediate: true,
  },
)

watch(actualRotate, (rotate, oldRotate) => {
  const oldWidth = imgWidth.value
  const oldHeight = imgHeight.value
  const oldTop = imgTop.value
  const oldLeft = imgLeft.value

  const [, , focusWidth, focusHeight] = focusRect.value

  const top = focusHeight / 2 - oldTop
  const left = focusWidth / 2 - oldLeft
  const right = oldWidth - left
  const bottom = oldHeight - top

  const r = (rotate - oldRotate) % 360
  let topOpposite = 0
  let leftOpposite = 0

  if (r === 0) return

  switch (r) {
    case -90:
    case 270:
      topOpposite = right
      leftOpposite = top
      break
    case -180:
    case 180:
      topOpposite = bottom
      leftOpposite = right
      break
    case -270:
    case 90:
      topOpposite = left
      leftOpposite = bottom
      break
  }

  imgTop.value = focusHeight / 2 - topOpposite
  imgLeft.value = focusWidth / 2 - leftOpposite

  if ((rotate % 180) - (oldRotate % 180) !== 0) {
    const [width, height] = [oldWidth, oldHeight].reverse()
    imgWidth.value = width
    imgHeight.value = height
  }
})

const isCaptured = ref(false)

const inInertia = ref(false)

const puppetStyle = computed(() => {
  const [width, height] = reversedCoverSize.value
  const scale = imgWidth.value / width || 1
  const x = imgLeft.value
  const y = imgTop.value

  return {
    width: width + 'px',
    height: height + 'px',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    transition: isStillRotating.value || isCaptured.value || inInertia.value ? 'none' : '',
  }
})

const imageStyle = computed(() => {
  const [reversedCoverWidth, reversedCoverHeight] = reversedCoverSize.value

  const r = Math.abs(actualRotate.value) % 360

  const [width, height] =
    r % 180 !== 0
      ? [reversedCoverHeight, reversedCoverWidth]
      : [reversedCoverWidth, reversedCoverHeight]

  return {
    width: width + 'px',
    height: height + 'px',
    transform: `translate(-50%, -50%) rotate(${actualRotate.value}deg)`,
  }
})

// ============================ 手势 ============================
const bounceCoeff = 4
const maxScale = 5

let stopInertialAnimate: (() => void) | null = null

onBeforeUnmount(() => {
  stopInertialAnimate?.()
})

const [onTouchStart, onTouchMove, onTouchEnd] = useDragPinch({
  onOffset(offsetX, offsetY) {
    const [, , focusWidth, focusHeight] = focusRect.value

    if (imgWidth.value !== focusWidth) {
      // 边界弹性
      if (imgLeft.value > 0 || imgLeft.value < focusWidth - imgWidth.value) {
        offsetX /= bounceCoeff
      }
      imgLeft.value += offsetX
    }

    if (imgHeight.value !== focusHeight) {
      // 边界弹性
      if (imgTop.value > 0 || imgTop.value < focusHeight - imgHeight.value) {
        offsetY /= bounceCoeff
      }
      imgTop.value += offsetY
    }
  },
  onScale(originX, originY, scale) {
    const [focusLeft, focusTop, focusWidth, focusHeight] = focusRect.value

    let offsetScaleX = imgWidth.value * scale
    let offsetScaleY = imgHeight.value * scale

    // 边界缩放弹性
    if (imgWidth.value < focusWidth || imgHeight.value < focusHeight) {
      offsetScaleX /= bounceCoeff
      offsetScaleY /= bounceCoeff
    } else if (imgWidth.value > reversedCoverSize.value[0] * maxScale && offsetScaleX > 0) {
      offsetScaleX = 0
      offsetScaleY = 0
    }

    const nextWidth = imgWidth.value + offsetScaleX
    const nextHeight = imgHeight.value + offsetScaleY

    const originScaleX = (originX - focusLeft - imgLeft.value) / imgWidth.value
    const originScaleY = (originY - focusTop - imgTop.value) / imgHeight.value

    imgLeft.value += (imgWidth.value - nextWidth) * originScaleX
    imgTop.value += (imgHeight.value - nextHeight) * originScaleY

    imgWidth.value = nextWidth
    imgHeight.value = nextHeight
  },
  onCapture() {
    isCaptured.value = true
    stopInertialAnimate?.()
  },
  onRelease(v) {
    const [, , focusWidth, focusHeight] = focusRect.value

    const currWidth = imgWidth.value
    const currHeight = imgHeight.value

    // 缩放回弹
    const tooSmall = currWidth < focusWidth || currHeight < focusHeight
    const tooBig = currWidth > reversedCoverSize.value[0] * maxScale

    if (tooSmall || tooBig) {
      const [width, height] = tooSmall
        ? getAspectFillSize(currWidth, currHeight, focusWidth, focusHeight)
        : reversedCoverSize.value.map((item) => item * maxScale)

      imgWidth.value = width
      imgHeight.value = height

      imgLeft.value += (currWidth - width) / 2
      imgTop.value += (currHeight - height) / 2
    }

    // 滑动回弹
    const overLeft = imgLeft.value > 0
    const overRight = imgLeft.value < focusWidth - imgWidth.value

    if (overLeft) {
      imgLeft.value = 0
    } else if (overRight) {
      imgLeft.value = focusWidth - imgWidth.value
    }

    const overTop = imgTop.value > 0
    const overBottom = imgTop.value < focusHeight - imgHeight.value
    if (overTop) {
      imgTop.value = 0
    } else if (overBottom) {
      imgTop.value = focusHeight - imgHeight.value
    }

    isCaptured.value = false

    // 惯性
    if (tooSmall || overLeft || overRight || overTop || overBottom) return

    if (v.x === 0 && v.y === 0) return

    inInertia.value = true

    const animateList = (
      [
        [v.x, imgLeft, focusWidth, imgWidth.value],
        [v.y, imgTop, focusHeight, imgHeight.value],
      ] as const
    )
      .filter(([v]) => v !== 0)
      .map(([v, translate, boxSize, elSize]) => {
        const animate = createInertialAnimate(v, {
          update(value) {
            let next = translate.value + value
            const overStart = next > 0
            const overEnd = next < boxSize - elSize

            if (overStart) {
              next = 0
            } else if (overEnd) {
              next = boxSize - elSize
            }
            translate.value = next

            if (overStart || overEnd) {
              animate.stop()
              tryFinish()
            }
          },
          complete() {
            tryFinish()
          },
        })
        animate.play()
        return animate
      })

    const tryFinish = () => {
      if (animateList.every((animate) => !animate.isAnimating())) {
        inInertia.value = false
      }
    }

    stopInertialAnimate = () => {
      animateList.forEach((animate) => {
        animate.stop()
      })
      inInertia.value = false
      stopInertialAnimate = null
    }
  },
})
const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

// ============================ canvas ============================
let canvas: HTMLCanvasElement | null = null
let context: CanvasRenderingContext2D | null = null

const cropImage = async () => {
  return new Promise<{ dataURL: string; width: number; height: number }>((resolve, reject) => {
    const [imgOrigW, imgOrigH] = imageOrigSize.value
    const [, , focusWidth, focusHeight] = focusRect.value

    const rotate = actualRotate.value % 360

    let scale = (rotate % 180 !== 0 ? imgOrigH : imgOrigW) / imgWidth.value

    let canvasW = focusWidth * scale
    let canvasH = focusHeight * scale

    let customScale = 1

    if (props.beforeCrop) {
      customScale = props.beforeCrop(canvasW, canvasH)
    }

    canvasW *= customScale
    canvasH *= customScale
    scale *= customScale

    const imgL = imgLeft.value * scale
    const imgT = imgTop.value * scale
    const imgW = imgOrigW * customScale
    const imgH = imgOrigH * customScale

    let tx = 0
    let ty = 0

    switch (rotate) {
      case 0:
        tx = imgL
        ty = imgT
        break
      case -90:
        tx = (imgW + imgT) * -1
        ty = imgL
        break
      case -180:
        tx = (imgW + imgL) * -1
        ty = (imgH + imgT) * -1
        break
      case -270:
        tx = imgT
        ty = (imgH + imgL) * -1
        break
    }

    const drawCanvas = (image: HTMLImageElement) => {
      if (!canvas) {
        canvas = document.createElement('canvas')
      }
      if (!context) {
        context = canvas.getContext('2d')
      }
      if (!context) {
        reject()
        return
      }

      canvas.width = canvasW
      canvas.height = canvasH

      context.clearRect(0, 0, canvasW, canvasH)
      context.save()
      context.rotate(rotate * (Math.PI / 180))
      context.translate(tx, ty)
      context.scale(customScale, customScale)
      context.drawImage(image, 0, 0, imgOrigW, imgOrigH, 0, 0, imgOrigW, imgOrigH)
      context.restore()

      const dataURL = canvas.toDataURL(props.type, props.quality)
      resolve({
        dataURL,
        width: canvasW,
        height: canvasH,
      })
    }

    loadImage(props.url).then(drawCanvas).catch(reject)
  })
}

// ============================ toolbar ============================
const onCancel = () => {
  props.cancel?.()
  close()
}

const onReset = () => {
  const current = Math.abs(rotate.value)
  const integer = Math.floor(current / 360) * 360
  rotate.value = (integer + (current % 360 > 180 ? 360 : 0)) * -1
}

const onRotate = () => {
  rotate.value -= 90
}

const isCropping = ref(false)

const onConfirm = () => {
  if (isCropping.value) {
    return
  }
  isCropping.value = true
  cropImage()
    .then(({ dataURL, width, height }) => {
      close()
      props.success?.(dataURL, {
        width,
        height,
      })
    })
    .catch((err) => {
      logError(err)
      props.fail?.(err)
    })
    .finally(() => {
      isCropping.value = false
      props.complete?.()
    })
}

// ============================ style ============================

const cropImageClass = computed(() => {
  return [bem.b()]
})

defineExpose<CropImageExpose>({})
</script>
