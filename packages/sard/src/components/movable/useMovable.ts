import { RefObject, useEffect, useMemo, useRef } from 'react'
import { useStrike, useEvent } from '../../use'
import {
  animate,
  getRectDampingValue,
  getInBoundValue,
  getOverflowRangeInArea,
  minmax,
  getDampingValue,
  transitionEnd,
} from '../../utils'

import {
  PAN_END,
  PAN_MOVE,
  PAN_START,
  PINCH_START,
  PINCH_MOVE,
  PINCH_END,
  StrikePanEvent,
  StrikePinchEvent,
} from '../../strike'

export interface UseMovableOptions {
  defaultX?: number
  defaultY?: number
  direction?: 'all' | 'vertical' | 'horizontal' | 'none'
  inertia?: boolean
  maxSpeed?: number
  inertiaDuration?: number
  inertiaTime?: number
  outOfBounds?: boolean
  inertiaMaxOverflow?: number
  damping?: number
  reboundDuration?: number
  touchable?: boolean
  lockDirection?: boolean
  scale?: boolean
  minScale?: number
  maxScale?: number
  onChange?: (x: number, y: number, scale: number) => void
  onWillChange?: (willChange: 'auto' | 'transform') => void
  onPanStart?: (event: StrikePanEvent) => void
  onPanMove?: (event: StrikePanEvent) => void
  onPanEnd?: (event: StrikePanEvent) => void
  onMoveEnd?: (x: number, y: number) => void
  onPinchStart?: (event: StrikePinchEvent) => void
  onPinchMove?: (event: StrikePinchEvent) => void
  onPinchEnd?: (event: StrikePinchEvent) => void
}

type EmptyFunc = () => void

type SideType = 'width' | 'height'

const DIR_HORIZONTAL = 'horizontal'
const DIR_VERTICAL = 'vertical'
const DIR_ALL = 'all'

export interface BoundingRect {
  x: number
  y: number
  width: number
  height: number
}

export function useMovable(
  elRef: RefObject<HTMLElement>,
  areaRect: BoundingRect,
  options: UseMovableOptions = {},
) {
  const {
    defaultX = 0,
    defaultY = 0,
    direction = DIR_ALL,
    inertia = false,
    maxSpeed = 4,
    inertiaDuration = 300,
    inertiaTime = 200,
    inertiaMaxOverflow = 50,
    outOfBounds = false,
    damping = 5,
    reboundDuration = 200,
    touchable = true,
    lockDirection = false,
    scale = false,
    minScale = 0.5,
    maxScale = 5,
    onChange,
    onWillChange,
    onPanStart,
    onPanMove,
    onPanEnd,
    onMoveEnd,
    onPinchStart,
    onPinchMove,
    onPinchEnd,
  } = options

  const currentX = useRef(defaultX)
  const currentY = useRef(defaultY)

  const innerDamping = useMemo(() => {
    return Math.max(1, damping)
  }, [damping])

  const downCoord = useRef({
    x: 0,
    y: 0,
  })

  const stopReboundAnimate = useRef<{
    x: null | EmptyFunc
    y: null | EmptyFunc
  }>({
    x: null,
    y: null,
  })

  const finishScaleReboundAnimate = useRef(null)

  const stopInertiaAnimate = useRef<{
    x: null | EmptyFunc
    y: null | EmptyFunc
  }>({
    x: null,
    y: null,
  })

  const viewRect = useRef<BoundingRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const stopAnimate = useEvent(() => {
    if (
      stopReboundAnimate.current.x ||
      stopReboundAnimate.current.y ||
      stopInertiaAnimate.current.x ||
      stopInertiaAnimate.current.y
    ) {
      stopReboundAnimate.current.x?.()
      stopReboundAnimate.current.y?.()
      stopInertiaAnimate.current.x?.()
      stopInertiaAnimate.current.y?.()
      stopReboundAnimate.current.x = null
      stopReboundAnimate.current.y = null
      stopInertiaAnimate.current.x = null
      stopInertiaAnimate.current.y = null
      onMoveEnd?.(currentX.current, currentY.current)
    }
    finishScaleReboundAnimate.current?.()
  })

  const updateDownCoord = useEvent(() => {
    function getDownCoord(side: SideType, curr: number) {
      return getRectDampingValue(
        curr,
        areaRect[side],
        viewRect.current[side],
        outOfBounds ? innerDamping : 0,
      )
    }

    downCoord.current.x = getDownCoord('width', currentX.current)
    downCoord.current.y = getDownCoord('height', currentY.current)
  })

  const handlePanStart = useEvent((event: StrikePanEvent) => {
    onPanStart?.(event)
    stopAnimate()

    updateDownCoord()

    onWillChange?.('transform')
  })

  const handlePanMove = useEvent((event: StrikePanEvent) => {
    onPanMove?.(event)
    const x = event.deltaX + downCoord.current.x
    const y = event.deltaY + downCoord.current.y

    function getCurrCoord(side: SideType, curr: number) {
      return getRectDampingValue(
        curr,
        areaRect[side],
        viewRect.current[side],
        outOfBounds ? 1 / innerDamping || 0 : 0,
      )
    }

    currentX.current =
      direction === DIR_ALL || direction === DIR_HORIZONTAL
        ? getCurrCoord('width', x)
        : currentX.current

    currentY.current =
      direction === DIR_ALL || direction === DIR_VERTICAL
        ? getCurrCoord('height', y)
        : currentY.current

    onChange?.(currentX.current, currentY.current, currentScale.current)
  })

  const setReboundAnimate = (axis: 'x' | 'y', from: number, to: number) => {
    stopReboundAnimate.current[axis] = animate({
      from,
      to,
      duration: reboundDuration,
      step(value) {
        if (axis === 'x') {
          onChange?.(
            (currentX.current = value),
            currentY.current,
            currentScale.current,
          )
        }
        if (axis === 'y') {
          onChange?.(
            currentX.current,
            (currentY.current = value),
            currentScale.current,
          )
        }
      },
      finish() {
        onMoveEnd?.(currentX.current, currentY.current)
        stopReboundAnimate.current[axis] = null
      },
    })
  }

  const correctPosition = useEvent((event?: StrikePanEvent) => {
    const reboundAnimate = (side: SideType, axis: 'x' | 'y', coord: number) => {
      const to = getInBoundValue(coord, areaRect[side], viewRect.current[side])
      const from = coord

      if (from !== to) {
        setReboundAnimate(axis, from, to)
      } else {
        // 惯性
        if (event && inertia) {
          const speed = minmax(
            event[axis === 'x' ? 'speedX' : 'speedY'],
            -maxSpeed,
            maxSpeed,
          )
          const to = from + speed * inertiaTime
          const overflow = inertiaMaxOverflow * innerDamping
          const overflowRange = getOverflowRangeInArea(
            overflow,
            areaRect[side],
            viewRect.current[side],
          )
          stopInertiaAnimate.current[axis] = animate({
            from,
            to: minmax(to, ...overflowRange),
            duration: inertiaDuration,
            step(value) {
              const dampedValue = getRectDampingValue(
                value,
                areaRect[side],
                viewRect.current[side],
                outOfBounds ? 1 / innerDamping || 0 : 0,
              )
              if (axis === 'x') {
                onChange?.(
                  (currentX.current = dampedValue),
                  currentY.current,
                  currentScale.current,
                )
              }
              if (axis === 'y') {
                onChange?.(
                  currentX.current,
                  (currentY.current = dampedValue),
                  currentScale.current,
                )
              }
            },
            finish() {
              stopInertiaAnimate.current[axis] = null

              const from = axis === 'x' ? currentX.current : currentY.current
              const to = getInBoundValue(
                from,
                areaRect[side],
                viewRect.current[side],
              )

              if (from !== to) {
                setReboundAnimate(axis, from, to)
              } else {
                onMoveEnd?.(currentX.current, currentY.current)
              }
            },
          })
        }
      }
    }

    if (direction === DIR_ALL || direction === DIR_HORIZONTAL) {
      reboundAnimate('width', 'x', currentX.current)
    }
    if (direction === DIR_ALL || direction === DIR_VERTICAL) {
      reboundAnimate('height', 'y', currentY.current)
    }
  })

  const handlePanEnd = useEvent((event: StrikePanEvent) => {
    onPanEnd?.(event)

    correctPosition(event)

    if (!direction) {
      onMoveEnd?.(currentX.current, currentY.current)
    }

    onWillChange?.('auto')
  })

  const panStrike = useStrike(
    elRef,
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
    },
    {
      pan: true,
    },
    {
      direction,
      lockDirection,
      binding: touchable,
    },
  )

  const pinchStartOffsetX = useRef(0)
  const pinchStartOffsetY = useRef(0)
  const consistentScale = useRef(1)
  const currentScale = useRef(1)

  const setTransitionDuration = (duration: number) => {
    if (elRef.current) {
      elRef.current.style.transitionDuration = duration + 'ms'
    }
  }

  const handlePinchStart = useEvent((event: StrikePinchEvent) => {
    onPinchStart?.(event)

    panStrike.unbind()

    const rect = elRef.current.getBoundingClientRect()

    const offsetX = event.x - rect.left
    const offsetY = event.y - rect.top

    pinchStartOffsetX.current = offsetX
    pinchStartOffsetY.current = offsetY

    elRef.current.style.transformOrigin = `${(offsetX / rect.width) * 100}% ${
      (offsetY / rect.height) * 100
    }%`

    onWillChange?.('transform')
  })

  const handlePinchMove = useEvent((event: StrikePinchEvent) => {
    onPinchMove?.(event)

    currentScale.current = getDampingValue(
      event.scale,
      minScale / consistentScale.current,
      maxScale / consistentScale.current,
      0.2,
    )

    onChange?.(currentX.current, currentY.current, currentScale.current)
  })

  const handlePinchEnd = useEvent((event: StrikePinchEvent) => {
    onPinchEnd?.(event)

    const offsetX = pinchStartOffsetX.current
    const offsetY = pinchStartOffsetY.current

    const nextCurrentScale = minmax(
      currentScale.current,
      minScale / consistentScale.current,
      maxScale / consistentScale.current,
    )

    const finish = () => {
      currentX.current = currentX.current - offsetX * (currentScale.current - 1)
      currentY.current = currentY.current - offsetY * (currentScale.current - 1)

      viewRect.current.width *= currentScale.current
      viewRect.current.height *= currentScale.current

      consistentScale.current *= currentScale.current

      currentScale.current = 1

      onChange?.(currentX.current, currentY.current, currentScale.current)
      onWillChange?.('auto')
      elRef.current.style.transformOrigin = '0 0'
      elRef.current.style.width = `${viewRect.current.width}px`
      elRef.current.style.height = `${viewRect.current.height}px`

      correctPosition()

      panStrike.bind()
    }

    if (nextCurrentScale !== currentScale.current) {
      setTransitionDuration(reboundDuration)
      currentScale.current = nextCurrentScale
      onChange?.(currentX.current, currentY.current, currentScale.current)

      finishScaleReboundAnimate.current = transitionEnd(() => {
        setTransitionDuration(0)
        finish()
      }, reboundDuration).finish
    } else {
      finish()
    }
  })

  useStrike(
    elRef,
    (strike) => {
      strike.on(PINCH_START, handlePinchStart)
      strike.on(PINCH_MOVE, handlePinchMove)
      strike.on(PINCH_END, handlePinchEnd)
    },
    null,
    {
      pinch: scale,
    },
  )

  useEffect(() => stopAnimate, [])

  const updateViewRect = useEvent((rect: BoundingRect) => {
    Object.assign(viewRect.current, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    })
  })

  const setCoord = useEvent((x: number, y: number) => {
    if (x !== undefined) {
      currentX.current = x
    }
    if (y !== undefined) {
      currentY.current = y
    }
    onChange?.(currentX.current, currentY.current, currentScale.current)
  })

  return {
    updateViewRect,
    setCoord,
  }
}

export default useMovable
