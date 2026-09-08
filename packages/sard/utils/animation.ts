import { type Ref } from 'vue'

// ============================ ticker ============================

type TickCallback = () => void

const callbacks = new Set<TickCallback>()
let rafId = 0

function loop() {
  rafId = requestAnimationFrame(loop)
  callbacks.forEach((callback) => callback())
}

/**
 * 基于单个 requestAnimationFrame 的共享循环，多个动画共用同一帧循环。
 */
export const ticker = {
  add(callback: TickCallback) {
    callbacks.add(callback)
    if (rafId === 0) {
      rafId = requestAnimationFrame(loop)
    }
  },
  remove(callback: TickCallback) {
    callbacks.delete(callback)
    if (rafId !== 0 && callbacks.size === 0) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  },
}

// ============================ easing ============================

type EasingName = 'easeOutCubic' | 'easeOutQuint'

const easings: Record<EasingName, (k: number) => number> = {
  easeOutCubic: (k) => 1 - Math.pow(1 - k, 3),
  easeOutQuint: (k) => 1 - Math.pow(1 - k, 5),
}

// ============================ animateNumber ============================

export interface AnimateNumberOptions {
  /** 动画时长，单位毫秒 */
  duration?: number
  /** 缓动函数名或自定义缓动函数 */
  easing?: EasingName | ((k: number) => number)
  /** 取整因子，每帧值会被舍入为 Math.round(value * round) / round */
  round?: number
  /** 每帧更新后回调 */
  update?: () => void
  /** 动画结束回调 */
  complete?: () => void
}

export interface Animation {
  /** 暂停动画，暂停后不会触发 complete */
  pause: () => void
}

/**
 * 将数字 ref 的 value 从当前值缓动到目标值，创建后自动播放。
 */
export function animateNumber(
  ref: Ref<number>,
  to: number,
  options: AnimateNumberOptions = {},
): Animation {
  const { duration = 0, easing = 'easeOutCubic', round, update, complete } = options
  const easingFn = typeof easing === 'function' ? easing : easings[easing]
  const from = ref.value
  const change = to - from
  const start = performance.now()

  const setValue = (value: number) => {
    ref.value = round === undefined ? value : Math.round(value * round) / round
  }

  const tick = () => {
    const progress = duration > 0 ? Math.min((performance.now() - start) / duration, 1) : 1
    setValue(from + change * easingFn(progress))
    update?.()
    if (progress >= 1) {
      pause()
      complete?.()
    }
  }

  const pause = () => {
    ticker.remove(tick)
  }

  ticker.add(tick)

  return { pause }
}
