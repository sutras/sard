import { minmax } from './utils'

export function easeInQuad(k: number) {
  return k * k
}

export function easeOutQuad(k: number) {
  return k * (2 - k)
}

export function easeInOutQuad(k: number) {
  if ((k *= 2) < 1) return 0.5 * k * k
  return -0.5 * (--k * (k - 2) - 1)
}

export function easeOutSine(k: number) {
  return Math.sin((k * Math.PI) / 2)
}

export function easeOutCubic(k: number) {
  return --k * k * k + 1
}

export interface AnimateOptions {
  from: number
  to: number
  duration?: number
  step?: (value: number) => void
  finish?: (value: number) => void
  easing?: (k: number) => number
}

export interface AnimateStop {
  (): void
  finish(): void
}

export function animate({
  from = 0,
  to = 0,
  duration = 0,
  step = () => {
    null
  },
  finish,
  easing = easeOutQuad,
}: AnimateOptions): AnimateStop {
  const total = to - from
  const begin = Date.now()
  let progress = 0
  let over = false
  const stop = () => {
    over = true
  }
  stop.finish = () => {
    stop()
    step(to)
    finish?.(to)
  }
  const stepCallback = () => {
    if (over) {
      return
    }
    progress = minmax((Date.now() - begin) / duration, 0, 1)
    const value = easing(progress) * total + from
    step(value)
    if (progress === 1) {
      stop()
      return finish?.(value)
    }
    requestAnimationFrame(stepCallback)
  }

  if (duration === 0) {
    step(to)
    finish?.(to)
  } else {
    requestAnimationFrame(stepCallback)
  }

  return stop
}

interface Point {
  x: number
  y: number
}

// 计算两点之间的距离
export function getDistanceByTowPoints(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

// 根据起始点和结束点坐标获取角度: 以3点钟方向为0度，逆时针递增
export function getAngle360(p1: Point, p2: Point) {
  const angle = 90 - (Math.atan2(p1.y - p2.y, p2.x - p1.x) / Math.PI) * 180
  return angle < 0 ? angle + 360 : angle
}

// 根据角度返回方向
export type Direction = 'right' | 'left' | 'up' | 'down'
export function getDirectionByAngle(angle: number): Direction {
  if (angle <= 45 || angle >= 315) {
    return 'up'
  } else if (angle > 45 && angle < 135) {
    return 'right'
  } else if (angle >= 135 && angle <= 225) {
    return 'down'
  } else {
    // angle > 225 && angle < 315
    return 'left'
  }
}

// 根据起始点和结束点获取方向（上下左右）
export function getDirectionByTwoPoints(p1: Point, p2: Point) {
  return getDirectionByAngle(getAngle360(p1, p2))
}
