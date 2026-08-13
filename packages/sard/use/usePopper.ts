import { onBeforeUnmount, reactive, watch, type Ref } from 'vue'
import { clamp, isRectEqual, type Size } from '../utils'
import { ticker } from 'lwa'

export interface PopperTarget {
  getBoundingClientRect: () => DOMRect
}

export type PopperPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export type Direction = 'top' | 'right' | 'bottom' | 'left'

export type Side = 'start' | 'center' | 'end'

export type Axis = 'top' | 'left'

const directions = ['top', 'right', 'bottom', 'left'] as const

export interface UsePopperOptions {
  position: () => PopperPosition
  refGap: () => number
  viewportGap: () => number
  arrowSize: number
}

export function usePopper(
  referenceRef: Ref<PopperTarget | Element | null>,
  floatingRef: Ref<HTMLElement | null>,
  enabledRef: Ref<boolean>,
  options: UsePopperOptions,
) {
  const { arrowSize, position, refGap, viewportGap } = options

  const arrowPos = reactive({
    left: 0,
    top: 0,
  })

  const floatingPos = reactive({
    left: 0,
    top: 0,
  })

  let cleanupAu: (() => void) | null = null

  function cleanup() {
    if (cleanupAu) {
      cleanupAu()
      cleanupAu = null
    }
  }

  function mayComputePosition() {
    cleanup()

    const reference = referenceRef.value
    const floating = floatingRef.value
    if (reference && floating) {
      cleanupAu = autoUpdate(reference, floating, () => {
        const refRect = reference.getBoundingClientRect()

        const [floatingPosition, arrowPosition] = computePosition(
          refRect,
          {
            width: floating.offsetWidth,
            height: floating.offsetHeight,
          },
          {
            position: position(),
            refGap: refGap(),
            viewportGap: viewportGap(),
            arrowSize,
          },
        )

        Object.assign(floatingPos, floatingPosition)
        Object.assign(arrowPos, arrowPosition)
      })
    }
  }

  watch(
    [referenceRef, floatingRef, enabledRef, position, refGap, viewportGap],
    ([reference, floating, enabled]) => {
      if (reference && floating && enabled) {
        mayComputePosition()
      } else {
        cleanup()
      }
    },
    {
      flush: 'post',
      immediate: true,
    },
  )

  onBeforeUnmount(() => {
    cleanup()
  })

  return [floatingPos, arrowPos]
}

function getReverseDirection(direction: Direction) {
  const index = directions.indexOf(direction)
  return directions[index + 2] ?? directions[index - 2]
}

function getAxis(direction: Direction) {
  return ['top', 'bottom'].includes(direction) ? 'left' : 'top'
}

function getCrossAxis(axis: Axis) {
  return axis === 'top' ? 'left' : 'top'
}

function getSizeNameByAxis(axis: Axis) {
  return axis === 'top' ? 'height' : 'width'
}

function getArrowCrossOffset(direction: Direction, size: Size) {
  const strategies = {
    top() {
      return size.height
    },
    right() {
      return 0
    },
    bottom() {
      return 0
    },
    left() {
      return size.width
    },
  }
  return strategies[direction]()
}

export function computePosition(
  refRect: DOMRect,
  floatingSize: { width: number; height: number },
  {
    refGap,
    position,
    viewportGap,
    arrowSize,
  }: {
    position: PopperPosition
    refGap: number
    viewportGap: number
    arrowSize: number
  },
) {
  const breadth = floatingSize.width + refGap
  const thickness = floatingSize.height + refGap

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const gapBoundaries = {
    top: refRect.top - thickness - viewportGap,
    right: windowWidth - refRect.right - breadth - viewportGap,
    bottom: windowHeight - refRect.bottom - thickness - viewportGap,
    left: refRect.left - breadth - viewportGap,
  }

  // 确定方位
  let [direction, side] = position.split('-') as [Direction, Side]

  // 适当反转
  if (gapBoundaries[direction] < 0) {
    direction = getReverseDirection(direction)
    if (gapBoundaries[direction] < 0) {
      direction = getReverseDirection(direction)
    }
  }

  // 确定端点
  side = side || 'center'

  // 确定轴
  const axis = getAxis(direction)
  const crossAxis = getCrossAxis(axis)

  // 确定尺寸
  const axisSizeName = getSizeNameByAxis(axis)

  const axisWindowSize = axis === 'top' ? windowHeight : windowWidth

  const floatingPosition = {
    top: 0,
    left: 0,
  }

  function getSideOffset() {
    const strategies = {
      start() {
        return refRect[axis]
      },
      center() {
        return refRect[axis] - (floatingSize[axisSizeName] - refRect[axisSizeName]) / 2
      },
      end() {
        return refRect[axis] - (floatingSize[axisSizeName] - refRect[axisSizeName])
      },
    }
    let offset = strategies[side]()

    // 确保处于屏幕内
    offset = clamp(offset, viewportGap, axisWindowSize - floatingSize[axisSizeName] - viewportGap)

    // 确保不脱离 ref
    offset = clamp(
      offset,
      refRect[axis] - floatingSize[axisSizeName] + arrowSize * 2,
      refRect[axis] + refRect[axisSizeName] - arrowSize * 2,
    )

    return offset
  }

  function getDirectionOffset() {
    const strategies = {
      top() {
        return refRect.top - refGap - floatingSize.height
      },
      right() {
        return refRect.right + refGap
      },
      bottom() {
        return refRect.bottom + refGap
      },
      left() {
        return refRect.left - refGap - floatingSize.width
      },
    }
    return strategies[direction]()
  }

  floatingPosition[crossAxis] = getDirectionOffset()
  floatingPosition[axis] = getSideOffset()

  const finalPopperRect = {
    top: floatingPosition.top,
    left: floatingPosition.left,
    bottom: floatingPosition.top + floatingSize.height,
    right: floatingPosition.left + floatingSize.width,
  }

  const arrowPosition = {
    top: 0,
    left: 0,
  }

  function getArrowOffset() {
    const reverseDirection = getReverseDirection(axis)

    let extra = refRect[axis] - finalPopperRect[axis]
    if (extra < 0) {
      extra = 0
    }

    const intersection =
      Math.min(refRect[reverseDirection], finalPopperRect[reverseDirection]) -
      Math.max(refRect[axis], finalPopperRect[axis])

    const offset = extra + intersection / 2

    // 确保箭头位于floating之内
    return clamp(offset, arrowSize, floatingSize[axisSizeName] - arrowSize)
  }

  arrowPosition[axis] = getArrowOffset()
  arrowPosition[crossAxis] = getArrowCrossOffset(direction, floatingSize)

  return [floatingPosition, arrowPosition] as const
}

function animationFrameUpdate(update: () => void) {
  function tick() {
    update()
  }

  ticker.add(tick)

  return () => {
    ticker.remove(tick)
  }
}

function observeMove(element: Element, onMove: () => void) {
  let io: IntersectionObserver | null = null

  function cleanup() {
    io?.disconnect()
    io = null
  }

  function refresh(skip = false) {
    cleanup()

    const rect = element.getBoundingClientRect()
    const { left, top, width, height } = rect

    if (!skip) {
      onMove()
    }

    if (!width || !height) {
      return
    }

    const insetTop = Math.floor(top)
    const insetRight = Math.floor(window.innerWidth - (left + width))
    const insetBottom = Math.floor(window.innerHeight - (top + height))
    const insetLeft = Math.floor(left)
    const rootMargin = `${-insetTop}px ${-insetRight}px ${-insetBottom}px ${-insetLeft}px`

    function handleObserve(entries: IntersectionObserverEntry[]) {
      const ratio = entries[0].intersectionRatio
      if (ratio !== 1) {
        refresh()
      }
    }

    io = new IntersectionObserver(handleObserve, {
      root: document,
      rootMargin,
      threshold: 1,
    })

    io.observe(element)
  }

  refresh(true)

  return cleanup
}

function observeResize(element: Element, onResize: () => void) {
  const resizeObserver = new ResizeObserver(() => {
    onResize()
  })
  resizeObserver.observe(element)

  return () => {
    resizeObserver.disconnect()
  }
}

function observeRect(target: PopperTarget, update: () => void) {
  let prevRefRect: DOMRect

  return animationFrameUpdate(() => {
    const refRect = target.getBoundingClientRect()

    if (!prevRefRect || !isRectEqual(prevRefRect, refRect)) {
      update()
    }
    prevRefRect = refRect
  })
}

export function autoUpdate(
  reference: PopperTarget | Element,
  floating: Element,
  update: () => void,
) {
  const cleanupFloatingOr = observeResize(floating, update)
  const cleanupReferenceOr = reference instanceof Element ? observeResize(reference, update) : null
  const cleanup =
    reference instanceof Element ? observeMove(reference, update) : observeRect(reference, update)

  update()

  return () => {
    cleanupFloatingOr()
    cleanupReferenceOr?.()
    cleanup()
  }
}
