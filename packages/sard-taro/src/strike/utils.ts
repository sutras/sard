import { Point } from './types'

export const SUPPORT_TOUCH = 'ontouchstart' in window
export const SUPPORT_MOUSE = 'onmousedown' in window

// 判断是否为移动设备
export function isMobile() {
  return /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent)
}

// 计算两点之间的距离
export function getDistanceByTowPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

// 根据箭头获取角度，值的范围是：-PI到PI
export function getAngleAtan2(x1: number, y1: number, x2: number, y2: number) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
}

// 根据箭头获取角度，值的范围是：0到PI
export function getAngle360(x1: number, y1: number, x2: number, y2: number) {
  const angle = (Math.atan2(y1 - y2, x2 - x1) / Math.PI) * 180
  return angle < 0 ? angle + 360 : angle
}

// 根据角度返回方向
export type Direction = 'right' | 'left' | 'up' | 'down'
export function getDirectionByAngle(angle: number): Direction {
  if (angle <= 45 || angle >= 315) {
    return 'right'
  } else if (angle > 45 && angle < 135) {
    return 'up'
  } else if (angle >= 135 && angle <= 225) {
    return 'left'
  } else {
    // angle > 225 && angle < 315
    return 'down'
  }
}

// 根据起始点和结束点获取方向
export function getDirectionByTwoPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return getDirectionByAngle(getAngle360(x1, y1, x2, y2))
}

// 获取事件发生时在屏幕上的手指数
export function getLenOfTouches(ev: TouchEvent | ITouchEvent): number {
  return 'touches' in ev ? ev.touches.length : 0
}

// 获取事件发生时在屏幕上的所有手指的位置
export function getPosOfTouches(ev: TouchEvent | ITouchEvent): Point[] {
  let pos: Point[]
  if ('touches' in ev) {
    pos = Array.from(ev.touches).map((touch) => ({
      x: touch.clientX,
      y: touch.clientY,
    }))
  } else {
    pos = [
      {
        x: ev.clientX,
        y: ev.clientY,
      },
    ]
  }
  return pos
}

// 判断轴是否为横向
export function getAxisByTwoPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return Math.abs(x2 - x1) > Math.abs(y2 - y1) ? 'horizontal' : 'vertical'
}

// 判断轴是否为横向
export function getAxisByOffset(movementX: number, movementY: number) {
  return movementX > movementY ? 'horizontal' : 'vertical'
}
