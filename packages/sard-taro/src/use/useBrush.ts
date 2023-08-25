/**
 * 对触摸的坐标信息进行简单封装
 */

import { ITouchEvent } from '@tarojs/components'
import { MutableRefObject, useRef } from 'react'

export type Axis = '' | 'horizontal' | 'vertical'

function getDirection(x: number, y: number): Axis {
  return x > y ? 'horizontal' : 'vertical'
}

export interface Brush {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  offsetX: number
  offsetY: number
  clientX: number
  clientY: number
  axis: Axis
  isVertical: () => boolean
  isHorizontal: () => boolean
  reset: () => void
  start: (event: ITouchEvent) => void
  move: (event: ITouchEvent) => void
}

export function useBrush() {
  const brush: MutableRefObject<Brush> = useRef({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    clientX: 0,
    clientY: 0,
    axis: '',
    isVertical: () => {
      const b = brush.current

      return b.axis === 'vertical'
    },
    isHorizontal: () => {
      const b = brush.current

      return b.axis === 'horizontal'
    },
    reset: () => {
      const b = brush.current

      b.startX = 0
      b.startY = 0
      b.deltaX = 0
      b.deltaY = 0
      b.offsetX = 0
      b.offsetY = 0
      b.clientX = 0
      b.clientY = 0
      b.axis = ''
    },
    start: (event) => {
      const b = brush.current
      const touch = event.touches[0]

      b.reset()
      b.startX = touch.clientX
      b.startY = touch.clientY
    },
    move: (event) => {
      const b = brush.current
      const touch = event.touches[0]

      b.clientX = touch.clientX
      b.clientY = touch.clientY
      b.deltaX = (touch.clientX < 0 ? 0 : touch.clientX) - b.startX
      b.deltaY = touch.clientY - b.startY
      b.offsetX = Math.abs(b.deltaX)
      b.offsetY = Math.abs(b.deltaY)

      if (b.axis === '') {
        b.axis = getDirection(b.offsetX, b.offsetY)
      }
    },
  })

  return brush.current
}
