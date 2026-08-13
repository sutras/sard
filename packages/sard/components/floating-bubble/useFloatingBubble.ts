import { computed, type MaybeRef, onMounted, ref, unref, useTemplateRef, watch } from 'vue'
import { usePointerDown, useTimeout } from '../../use'
import { clamp } from '../../utils'
import { windowInfo } from '../config/windowInfo'

export interface UseFloatingBubbleProps {
  draggable?: boolean
  marginX: number
  marginY: number
  axis: 'x' | 'y' | 'none' | 'both'
  magnet?: 'x' | 'y'
  offset?: {
    x: number
    y: number
  }
}

export interface UseFloatingBubbleEmits {
  (e: 'update:offset', offset: { x: number; y: number }): void
}

export interface UseFloatingBubbleOptions {
  disabled?: MaybeRef<boolean>
}

export function useFloatingBubble(
  props: UseFloatingBubbleProps,
  emit: UseFloatingBubbleEmits,
  options: UseFloatingBubbleOptions = {},
) {
  const disabled = computed(() => !props.draggable || unref(options.disabled))
  const bubbleRef = useTemplateRef<HTMLElement>('bubble')

  const initialized = ref(false)

  let bubbleRect: DOMRect | undefined
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  let downCoord = {
    x: 0,
    y: 0,
  }
  const position = ref({
    x: 0,
    y: 0,
  })

  const animated = ref(false)
  const stopBubbling = ref(false)

  const animatedTimer = useTimeout()

  function getMinX() {
    return props.marginX
  }

  function getMaxX() {
    return windowWidth - props.marginX - bubbleRect!.width
  }

  function getMinY() {
    return props.marginY + (windowInfo.navBarHeight + windowInfo.statusBarHeight)
  }

  function getMaxY() {
    return windowHeight - windowInfo.tabBarHeight - props.marginY - bubbleRect!.height
  }

  const onTouchStart = async (event: TouchEvent) => {
    stopBubbling.value = false

    if (disabled.value) return

    animatedTimer.clear()
    animated.value = false

    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    bubbleRect = bubbleRef.value!.getBoundingClientRect()
  }

  const onTouchMove = (event: TouchEvent) => {
    if (disabled.value) return

    if (!bubbleRect) {
      return
    }

    let x = 0
    let y = 0

    if (props.axis === 'none') {
      x = getMaxX()
      y = getMaxY()
    } else {
      const deltaX = event.touches[0].clientX - downCoord.x
      const deltaY = event.touches[0].clientY - downCoord.y

      const deviation = 10
      if (Math.abs(deltaX) > deviation || Math.abs(deltaY) > deviation) {
        stopBubbling.value = true
      }

      x = bubbleRect.left + deltaX
      y = bubbleRect.top + deltaY

      x = clamp(x, getMinX(), getMaxX())
      y = clamp(y, getMinY(), getMaxY())

      if (props.axis === 'y') {
        x = getMaxX()
      } else if (props.axis === 'x') {
        y = getMaxY()
      }
    }

    const offset = {
      x,
      y,
    }
    position.value = offset
    emit('update:offset', offset)
  }

  const onTouchEnd = () => {
    if (disabled.value) return

    if (bubbleRect) {
      if (props.magnet) {
        let { x, y } = position.value
        if (props.magnet === 'x') {
          x = x < (windowWidth - bubbleRect.width) / 2 ? getMinX() : getMaxX()
        } else if (props.magnet === 'y') {
          y = y < (windowHeight - bubbleRect.height) / 2 ? getMinY() : getMaxY()
        }

        const offset = {
          x,
          y,
        }
        position.value = offset
        emit('update:offset', offset)
      }
    }
    animated.value = true

    animatedTimer.set(() => {
      animated.value = false
    }, 500)

    bubbleRect = undefined
  }

  const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

  onMounted(async () => {
    bubbleRect = bubbleRef.value!.getBoundingClientRect()

    position.value = props.offset ?? {
      x: getMaxX(),
      y: getMaxY(),
    }
    bubbleRect = undefined
    initialized.value = true
  })

  watch(
    () => props.offset,
    () => {
      if (props.offset) {
        position.value = props.offset
      }
    },
  )

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onPointerDown,
    position,
    initialized,
    animated,
    stopBubbling,
    windowWidth,
    windowHeight,
  }
}
