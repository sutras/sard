export interface DefaultConfig {
  direction: 'all' | 'vertical' | 'horizontal' | 'none'
  lockDirection: boolean
  lockDirectionDistance: number

  tap: boolean
  tapMaxTime: number
  tapMaxDistance: number

  doubletap: boolean
  doubleTabMaxTime: number
  doubleTabMaxDistance: number

  press: boolean
  pressMinTime: number
  pressMaxDistance: number

  swipe: boolean
  swipeMaxTime: number
  swipeMinDistance: number

  pan: boolean
  panMinDistance: number
  panSwipeMaxTime: number
  panSwipeMinDistance: number
  panSwipeMinSpeed: number

  rotate: boolean

  pinch: boolean
  pinchMinDistance: number

  init: boolean
}

export type PartialConfig = Partial<DefaultConfig>

export const defaultConfig: DefaultConfig = {
  direction: 'all',
  lockDirection: false, // 是否锁定方向
  lockDirectionDistance: 8, // 滑动超过此距离，锁定方向

  tap: false, // 是否支持tap事件
  tapMaxTime: 650, // 触发单击的最大时长
  tapMaxDistance: 5, // 触发单击的最大误差距离

  doubletap: false, // 是否支持doubletap事件
  doubleTabMaxTime: 300, // 双击间的最大时长
  doubleTabMaxDistance: 45, // 双击间的最大误差距离

  press: false, // 是否支持按压事件
  pressMinTime: 350, // 触发按压的最小时长
  pressMaxDistance: 5, // 触发按压的最大误差距离

  swipe: false, // 是否支持滑动事件
  swipeMaxTime: 300, // 触发滑动的最大时长
  swipeMinDistance: 30, // 触发滑动的最小距离

  pan: false, // 是否支持pan事件
  panMinDistance: 5, // 触发平移的最小距离
  panSwipeMaxTime: 300, // 触发平移滑动的最大时长
  panSwipeMinDistance: 30, // 触发平移滑动的最小距离
  panSwipeMinSpeed: 0.3, // 触发平移滑动的速度 px/ms

  rotate: false, // 是否支持rotate事件

  pinch: false, // 是否支持pinch事件
  pinchMinDistance: 5, // 前后缩放至少要大于此距离

  init: true, // 是否默认初始化
}
