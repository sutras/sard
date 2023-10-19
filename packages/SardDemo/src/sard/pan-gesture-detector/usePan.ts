import { useMemo } from 'react'
import { isPC, createMouseBinder } from '../utils'

export interface PanHandler {
  (event: any): void
}

export interface PanEvent {
  x0: number
  y0: number
  moveX: number
  moveY: number
  dx: number
  dy: number
  vx: number
  vy: number
  offsetX: number
  offsetY: number
  axis: '' | 'horizontal' | 'vertical'
  timestamp: number
}

export interface PanCallback {
  (event: PanEvent): void
}

export interface UsePanOptions {
  start?: PanCallback
  move?: PanCallback
  end?: PanCallback
}

export type Axis = '' | 'horizontal' | 'vertical'

const minAxisDistance = 5

function getDirection(offsetX: number, offsetY: number): Axis {
  if (!isPC || offsetX >= minAxisDistance || offsetY >= minAxisDistance) {
    return offsetX > offsetY ? 'horizontal' : 'vertical'
  }
  return ''
}

function getTouch(event: any) {
  let clientX = 0
  let clientY = 0

  // rn
  if (event.allTouches) {
    const touch = event.allTouches[0]
    clientX = touch.absoluteX
    clientY = touch.absoluteY
  }

  // web mobile
  else if (event.touches) {
    const touch = event.touches[0]
    clientX = touch.clientX
    clientY = touch.clientY
  }

  // web pc
  else {
    clientX = event.clientX
    clientY = event.clientY
  }

  return {
    clientX: clientX,
    clientY: clientY,
    timestamp: Date.now(),
  }
}

export interface Handlers {
  onMouseDown?: ((event: any) => void) | undefined
  onTouchStart: PanHandler
  onTouchMove: PanHandler
  onTouchEnd: PanHandler
  onTouchCancel: PanHandler
}

export function createHandlers(
  onStart: PanHandler,
  onMove: PanHandler,
  onEnd: PanHandler,
  onCancel: PanHandler,
) {
  return {
    onTouchStart: onStart,
    onTouchMove: onMove,
    onTouchEnd: onEnd,
    onTouchCancel: onCancel,
    ...(isPC
      ? createMouseBinder({
          onStart,
          onMove,
          onEnd,
        })
      : null),
  }
}

function createPan() {
  let x0 = 0
  let y0 = 0
  let moveX = 0
  let moveY = 0
  let dx = 0
  let dy = 0
  let vx = 0
  let vy = 0
  let timestamp = 0
  let axis: Axis = ''
  let offsetX = 0
  let offsetY = 0

  let onStart: PanCallback
  let onMove: PanCallback
  let onEnd: PanCallback
  let onCancel: PanCallback

  function startHandler(event) {
    const touch = getTouch(event)
    x0 = touch.clientX as number
    y0 = touch.clientY as number
    moveX = x0
    moveY = y0
    timestamp = touch.timestamp
    axis = ''

    return onStart?.(createPanGesture())
  }

  function moveHandler(event) {
    const touch = getTouch(event)
    const currentX = touch.clientX
    const currentY = touch.clientY
    dx = currentX - x0
    dy = currentY - y0
    const duration = touch.timestamp - timestamp
    vx = (currentX - moveX) / duration
    vy = (currentY - moveY) / duration
    moveX = currentX
    moveY = currentY
    timestamp = touch.timestamp
    offsetX = Math.abs(dx)
    offsetY = Math.abs(dy)

    if (axis === '') {
      axis = getDirection(offsetX, offsetY)
    }

    return onMove?.(createPanGesture())
  }

  function endHandler() {
    return onEnd?.(createPanGesture())
  }

  function cancelHandler() {
    return onCancel?.(createPanGesture())
  }

  function setOnStart(callback: PanCallback) {
    onStart = callback
  }

  function setOnMove(callback: PanCallback) {
    onMove = callback
  }

  function setOnEnd(callback: PanCallback) {
    onEnd = callback
  }

  function setOnCancel(callback: PanCallback) {
    onCancel = callback
  }

  function createPanGesture() {
    return {
      x0,
      y0,
      moveX,
      moveY,
      dx,
      dy,
      vx,
      vy,
      offsetX,
      offsetY,
      axis,
      timestamp,
    }
  }

  const handlers = createHandlers(
    startHandler,
    moveHandler,
    endHandler,
    cancelHandler,
  )

  return {
    setOnStart,
    setOnMove,
    setOnEnd,
    setOnCancel,
    handlers,
  }
}

export function usePan({ start, move, end }: UsePanOptions) {
  const pan = useMemo(() => createPan(), [])

  start && pan.setOnStart(start)
  move && pan.setOnMove(move)
  end && (pan.setOnEnd(end), pan.setOnCancel(end))

  return pan.handlers
}
