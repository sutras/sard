<template>
  <div
    :class="bem.e('item')"
    @pointerdown="onPointerDown"
    @touchstart.prevent="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <div :class="bem.e('puppet')" :style="puppetStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import { useDragPinch, usePointerDown, useSimulatedDblClick } from '../../use'
import { createBem, createInertialAnimate, getAspectFitSize, loadImage } from '../../utils'
import { previewImageContextKey, type PreviewImageItemProps } from './common'

const props = withDefaults(defineProps<PreviewImageItemProps>(), {})

const bem = createBem('preview-image')

const context = inject(previewImageContextKey)!

// ============================ image & focus & puppet ============================
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

const imgNaturalSize = ref<[number, number]>([0, 0])

watch(
  () => props.url,
  (url) => {
    imgNaturalSize.value = [0, 0]

    if (url) {
      loadImage(url).then((img) => {
        imgNaturalSize.value = [img.naturalWidth, img.naturalHeight]
      })
    }
  },
  {
    immediate: true,
  },
)

const imgContainSize = computed(() => {
  return getAspectFitSize(...imgNaturalSize.value, windowWidth, windowHeight)
})

const imgCurrLeft = ref(0)
const imgCurrTop = ref(0)
const imgCurrWidth = ref(0)
const imgCurrHeight = ref(0)

const isContainSize = computed(() => {
  const [containWidth, containHeight] = imgContainSize.value
  return imgCurrWidth.value === containWidth && imgCurrHeight.value === containHeight
})

const adjustToCenterX = () => {
  imgCurrLeft.value = (windowWidth - imgCurrWidth.value) / 2
}
const adjustToCenterY = () => {
  imgCurrTop.value = (windowHeight - imgCurrHeight.value) / 2
}

const adjustToCenterPosition = () => {
  adjustToCenterX()
  adjustToCenterY()
}

watch(
  imgContainSize,
  ([containWidth, containHeight]) => {
    imgCurrWidth.value = containWidth
    imgCurrHeight.value = containHeight
    adjustToCenterPosition()
  },
  {
    immediate: true,
  },
)

const isCaptured = ref(false)

const inInertiaMotion = ref(false)

const puppetStyle = computed(() => {
  const [width, height] = imgContainSize.value
  const scale = imgCurrWidth.value / width || 1
  const x = imgCurrLeft.value
  const y = imgCurrTop.value

  return {
    width: width + 'px',
    height: height + 'px',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    transition: context.visibleSwitching || isCaptured.value || inInertiaMotion.value ? 'none' : '',
    backgroundImage: `url(${props.url})`,
  }
})

// ============================ 拖拽 & 缩放 ============================

const BOUNCE_COEFF = 4
const MAX_SCALE = 5

let stopInertialAnimate: (() => void) | null = null

onBeforeUnmount(() => {
  stopInertialAnimate?.()
})

const handleScale = (originX: number, originY: number, nextWidth: number, nextHeight: number) => {
  const originScaleX = (originX - imgCurrLeft.value) / imgCurrWidth.value
  const originScaleY = (originY - imgCurrTop.value) / imgCurrHeight.value

  imgCurrLeft.value += (imgCurrWidth.value - nextWidth) * originScaleX
  imgCurrTop.value += (imgCurrHeight.value - nextHeight) * originScaleY

  imgCurrWidth.value = nextWidth
  imgCurrHeight.value = nextHeight
}

const [onDragPinchStart, onDragPinchMove, onDragPinchEnd] = useDragPinch({
  onCapture() {
    isCaptured.value = true
    stopInertialAnimate?.()
  },
  onOffset(offsetX, offsetY, event) {
    if (isContainSize.value) return

    event.stopImmediatePropagation()

    // 边界弹性
    if (imgCurrWidth.value > windowWidth) {
      if (imgCurrLeft.value > 0 || imgCurrLeft.value < windowWidth - imgCurrWidth.value) {
        offsetX /= BOUNCE_COEFF
      }
      imgCurrLeft.value += offsetX
    }

    // 边界弹性
    if (imgCurrHeight.value > windowHeight) {
      if (imgCurrTop.value > 0 || imgCurrTop.value < windowHeight - imgCurrHeight.value) {
        offsetY /= BOUNCE_COEFF
      }
      imgCurrTop.value += offsetY
    }
  },
  onScale(originX, originY, scale) {
    const [containWidth, containHeight] = imgContainSize.value

    let scaleDeltaX = imgCurrWidth.value * scale
    let scaleDeltaY = imgCurrHeight.value * scale

    // 边界缩放弹性
    if (imgCurrWidth.value < containWidth || imgCurrHeight.value < containHeight) {
      scaleDeltaX /= BOUNCE_COEFF
      scaleDeltaY /= BOUNCE_COEFF
    } else if (imgCurrWidth.value > containWidth * MAX_SCALE && scaleDeltaX > 0) {
      scaleDeltaX = 0
      scaleDeltaY = 0
    }

    const nextWidth = imgCurrWidth.value + scaleDeltaX
    const nextHeight = imgCurrHeight.value + scaleDeltaY

    handleScale(originX, originY, nextWidth, nextHeight)
  },
  onRelease(v) {
    isCaptured.value = false

    const [containWidth, containHeight] = imgContainSize.value

    const _currWidth = imgCurrWidth.value
    const _currHeight = imgCurrHeight.value

    // 缩放回弹
    const tooSmall = _currWidth < containWidth || _currHeight < containHeight
    const tooBig = _currWidth > containWidth * MAX_SCALE

    if (tooSmall || tooBig) {
      const [edgeWidth, edgeHeight] = tooSmall
        ? imgContainSize.value
        : imgContainSize.value.map((item) => item * MAX_SCALE)

      imgCurrWidth.value = edgeWidth
      imgCurrHeight.value = edgeHeight

      imgCurrLeft.value += (_currWidth - edgeWidth) / 2
      imgCurrTop.value += (_currHeight - edgeHeight) / 2
    }

    context.immersive = !isContainSize.value

    if (isContainSize.value) {
      adjustToCenterPosition()
      return
    }

    // 滑动回弹
    const overWidth = imgCurrWidth.value > windowWidth
    if (overWidth) {
      const overLeft = imgCurrLeft.value > 0
      const overRight = imgCurrLeft.value < windowWidth - imgCurrWidth.value

      if (overLeft) {
        imgCurrLeft.value = 0
      } else if (overRight) {
        imgCurrLeft.value = windowWidth - imgCurrWidth.value
      }
    } else {
      adjustToCenterX()
    }

    const overHeight = imgCurrHeight.value > windowHeight
    if (overHeight) {
      const overTop = imgCurrTop.value > 0
      const overBottom = imgCurrTop.value < windowHeight - imgCurrHeight.value
      if (overTop) {
        imgCurrTop.value = 0
      } else if (overBottom) {
        imgCurrTop.value = windowHeight - imgCurrHeight.value
      }
    } else {
      adjustToCenterY()
    }

    // 惯性
    const overLeft = imgCurrLeft.value > 0
    const overRight = imgCurrLeft.value < windowWidth - imgCurrWidth.value

    const overTop = imgCurrTop.value > 0
    const overBottom = imgCurrTop.value < windowHeight - imgCurrHeight.value

    const animateList = (
      [
        [overLeft || overRight, v.x, imgCurrLeft, windowWidth, imgCurrWidth.value],
        [overTop || overBottom, v.y, imgCurrTop, windowHeight, imgCurrHeight.value],
      ] as const
    )
      .filter(([over, v]) => !over && v !== 0)
      .map(([, v, translate, boxSize, elSize]) => {
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

    if (animateList.length === 0) return

    inInertiaMotion.value = true

    const tryFinish = () => {
      if (animateList.every((animate) => !animate.isAnimating())) {
        inInertiaMotion.value = false
      }
    }

    stopInertialAnimate = () => {
      animateList.forEach((animate) => {
        animate.stop()
      })
      inInertiaMotion.value = false
      stopInertialAnimate = null
    }
  },
})

// ============================ 双击 ============================
const DBL_CLICK_SCALE = 2

const [onDblClickStart, onDblClickEnd] = useSimulatedDblClick({
  onDblClick(x, y) {
    if (isContainSize.value) {
      const nextWidth = imgCurrWidth.value * DBL_CLICK_SCALE
      const nextHeight = imgCurrHeight.value * DBL_CLICK_SCALE
      handleScale(x, y, nextWidth, nextHeight)
    } else {
      imgCurrWidth.value = imgContainSize.value[0]
      imgCurrHeight.value = imgContainSize.value[1]
      adjustToCenterPosition()
    }
  },
  onClick() {
    if (!context.sceneType) {
      context.close()
    }
  },
})

// ============================ 触摸 ============================

const onTouchStart = (event: TouchEvent) => {
  if (context.sceneType !== 'swipe') {
    onDblClickStart(event)
    onDragPinchStart(event)
  }
}

const onTouchMove = (event: TouchEvent) => {
  if (!context.sceneType) {
    if (event.touches.length > 1) {
      context.sceneType = 'dragPinch'
    } else {
      context.sceneType = 'swipe'
    }
  }

  if (context.sceneType === 'dragPinch') {
    event.stopImmediatePropagation()
    onDragPinchMove(event)
  }
}

const onTouchEnd = (event: TouchEvent) => {
  if (context.sceneType !== 'swipe') {
    onDblClickEnd(event)
    onDragPinchEnd(event)
  }

  if (isContainSize.value) {
    if (event.touches.length === 0) {
      context.sceneType = null
    }
  } else {
    context.sceneType = 'dragPinch'
  }
}

const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)
</script>
