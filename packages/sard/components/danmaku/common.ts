import { type DefaultProps } from '../config'

export interface DanmakuProps<T> {
  list?: T[]
  rows?: number
  speed?: number
  /** 速度浮动范围 (px/s)，每条弹幕在 [speed - speedRange, speed + speedRange] 内随机取速，0 表示不浮动 */
  speedRange?: number
  gap?: number
  autoPlay?: boolean
  loop?: boolean
  /** 页面隐藏或滚出视口时自动暂停，默认开启 */
  autoPause?: boolean
  /** 同时在飞弹幕数量上限，0 表示不限制 */
  maxItems?: number
  /** 动画缓动函数 */
  easing?: string
  /** 轨道高度，数字视为 px */
  rowHeight?: number | string
}

export const defaultDanmakuProps: DefaultProps<DanmakuProps<any>> = {
  rows: 3,
  speed: 100,
  speedRange: 0,
  gap: 40,
  autoPlay: true,
  loop: false,
  autoPause: true,
  maxItems: 0,
  easing: 'linear',
}

export interface DanmakuSlots<T> {
  item?(props: { item: T; index: number }): any
}

export interface DanmakuEmits {
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'finish'): void
}

export interface DanmakuExpose<T> {
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  send: (item: T) => void
}
