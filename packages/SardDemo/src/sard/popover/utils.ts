import { getSystemInfoSync } from '@tarojs/taro'
import { minmax } from '../utils'

export type Placement =
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

export interface Rect {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

export type Direction = 'top' | 'right' | 'bottom' | 'left'

export type Side = 'start' | 'center' | 'end'

export type Axis = 'top' | 'left'

const directions = ['top', 'right', 'bottom', 'left'] as const

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

function getArrowCrossOffset(direction: Direction, rect: Rect) {
  const strategies = {
    top() {
      return rect.height
    },
    right() {
      return 0
    },
    bottom() {
      return 0
    },
    left() {
      return rect.width
    },
  }
  return strategies[direction]()
}

export function getPopoverPosition(
  refRect: Rect,
  popperRect: Rect,
  {
    refGap,
    placement,
    viewportGap,
  }: {
    refGap: number
    placement: Placement
    viewportGap: number
  },
) {
  const breadth = popperRect.width + refGap
  const thickness = popperRect.height + refGap

  const systemInfo = getSystemInfoSync()
  const windowWidth = systemInfo.windowWidth
  const windowHeight = systemInfo.windowHeight

  const gapBoundaries = {
    top: refRect.top - thickness - viewportGap,
    right: windowWidth - refRect.right - breadth - viewportGap,
    bottom: windowHeight - refRect.bottom - thickness - viewportGap,
    left: refRect.left - breadth - viewportGap,
  }

  // 确定方位
  let [direction, side] = placement.split('-') as [Direction, Side]

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
  const sizeName = getSizeNameByAxis(axis)

  const windowSize = axis === 'top' ? windowHeight : windowWidth

  const popperStyle = {
    top: 0,
    left: 0,
  }

  function getSideOffset() {
    const strategies = {
      start() {
        return refRect[axis]
      },
      center() {
        return refRect[axis] - (popperRect[sizeName] - refRect[sizeName]) / 2
      },
      end() {
        return refRect[axis] - (popperRect[sizeName] - refRect[sizeName])
      },
    }
    const offset = strategies[side]()
    return minmax(
      offset,
      viewportGap,
      windowSize - popperRect[sizeName] - viewportGap,
    )
  }

  function getDirectionOffset() {
    const strategies = {
      top() {
        return refRect.top - refGap - popperRect.height
      },
      right() {
        return refRect.right + refGap
      },
      bottom() {
        return refRect.bottom + refGap
      },
      left() {
        return refRect.left - refGap - popperRect.width
      },
    }
    return strategies[direction]()
  }

  popperStyle[crossAxis] = getDirectionOffset()
  popperStyle[axis] = getSideOffset()

  const finalPopperRect = {
    top: popperStyle.top,
    left: popperStyle.left,
    bottom: popperStyle.top + popperRect.height,
    right: popperStyle.left + popperRect.width,
  }

  const arrowStyle: {
    top: number
    left: number
  } = {
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

    return extra + intersection / 2
  }

  arrowStyle[axis] = getArrowOffset()
  arrowStyle[crossAxis] = getArrowCrossOffset(direction, popperRect)

  return [popperStyle, arrowStyle] as const
}
