import {
  getDistanceByTowPoints,
  getDirectionByTwoPoints,
  getAxisByOffset,
  Direction,
} from './utils'
import { Point, StrikeTouchList, StrikeTouch } from './types'
import { DefaultConfig } from './defaultConfig'

export interface Track extends Point {
  time: number
}

export interface Knock {
  currentTarget: EventTarget | null
  target: EventTarget | null
  startX: number
  startY: number
  startTime: number
  recordX: number
  recordY: number
  x: number
  y: number
  time: number
  tracks: Track[]
  deltaX: number
  deltaY: number
  movementX: number
  movementY: number
  pressTimer: number // 按压定时器
  isPress: boolean // 是否处于按压状态
  lockDirection: '' | 'vertical' | 'horizontal'
  // pan 和 swipe 滑动方向是否符合预期
  expectedDirection: boolean
  direction: 'up' | 'right' | 'down' | 'left' | ''
  firstFinger: boolean
}

export interface Knocks {
  [props: number]: Knock
}

export interface Fingers {
  knocks: Knocks
  add(
    currentTarget: EventTarget,
    touches: StrikeTouchList,
    callback?: (...args: unknown[]) => unknown,
  ): void
  update(
    touches: StrikeTouchList,
    callback?: (...args: unknown[]) => unknown,
  ): void
  track(knock: Knock, callback?: (...args: unknown[]) => unknown): void
  remove(touches: StrikeTouchList): void
  getStartDistance(knock: Knock): number
  getRecordDistance(knock: Knock): number
  getDirectionWhenEnd(knock: Knock): Direction
  getDirectionWhenMoving(knock: Knock): Direction
  getExpires(knock: Knock): number
  clear(): void
  count(): number
}

export function createKnock(
  currentTarget: EventTarget,
  x: number,
  y: number,
): Knock {
  const time = Date.now()

  return {
    currentTarget,
    target: null,
    startX: x,
    startY: y,
    recordX: x,
    recordY: y,
    x,
    y,
    tracks: [
      {
        x,
        y,
        time,
      },
    ],
    startTime: time,
    time,
    deltaX: 0,
    deltaY: 0,
    movementX: 0,
    movementY: 0,
    pressTimer: 0,
    isPress: false,
    lockDirection: '',
    expectedDirection: false,
    direction: '',
    firstFinger: false,
  }
}

export function updateKnock(
  knock: Knock,
  x: number,
  y: number,
  lockDirectionDistance: number,
) {
  knock.time = Date.now()
  knock.x = x
  knock.y = y
  knock.deltaX = x - knock.startX
  knock.deltaY = y - knock.startY
  knock.movementX = Math.abs(knock.deltaX)
  knock.movementY = Math.abs(knock.deltaY)

  if (
    knock.lockDirection === '' ||
    (knock.movementX < lockDirectionDistance &&
      knock.movementY < lockDirectionDistance)
  ) {
    knock.lockDirection = getAxisByOffset(knock.movementX, knock.movementY)
  }
}

// 保存所有手指的信息
export function createFingers(config: DefaultConfig): Fingers {
  const knocks: Knocks = {}
  let firstFinger = -1

  // 记录按下时手指的信息
  function add(
    currentTarget: EventTarget,
    touches: StrikeTouchList,
    callback?: (...args: unknown[]) => unknown,
  ) {
    touches.forEach((touch: StrikeTouch) => {
      if (firstFinger === -1) {
        firstFinger = touches[0].identifier
      }

      const x = touch.clientX
      const y = touch.clientY
      const knock = createKnock(currentTarget, x, y)
      knock.target = touch.target
      knock.firstFinger = firstFinger === touch.identifier
      knocks[touch.identifier] = knock

      if (callback) {
        callback(knock)
      }
    })
  }
  // 更新在屏幕上的手指的信息
  function update(
    touches: StrikeTouchList,
    callback?: (...args: unknown[]) => unknown,
  ) {
    touches.forEach((touch: StrikeTouch) => {
      const knock: Knock = knocks[touch.identifier]
      if (!knock) {
        return
      }

      const x = touch.clientX
      const y = touch.clientY
      updateKnock(knock, x, y, config.lockDirectionDistance)

      if (callback) {
        callback(knock)
      }
    })
  }

  // 跟踪一段时间内手指在屏幕上移动的信息
  function track(knock: Knock, callback?: (...args: unknown[]) => unknown) {
    const tracks = knock.tracks

    const now = Date.now()

    // const index = tracks.findIndex(
    //   (track) => now - track.time <= config.panSwipeMaxTime
    // )
    // 仅保留 panSwipeMaxTime 时间内的 knock
    // if (index !== -1) {
    //   tracks.splice(0, index)
    // } else {
    //   tracks.length = 0
    // }

    tracks.push({
      x: knock.x,
      y: knock.y,
      time: now,
    })

    if (tracks.length > 3) {
      tracks.shift()
    }

    if (callback) {
      callback(knock)
    }
  }

  // 移除掉不在屏幕上的手指的信息
  // touchend 事件触发时调用
  function remove(touches: StrikeTouchList) {
    touches.forEach((touch) => {
      if (touch.identifier === firstFinger) {
        firstFinger = -1
      }
      delete knocks[touch.identifier]
    })
  }

  // 获取起始点到当前点（结束点）之间的距离
  function getStartDistance(knock: Knock) {
    return getDistanceByTowPoints(knock.startX, knock.startY, knock.x, knock.y)
  }

  // 获取记录点到当前点之间的距离
  function getRecordDistance(knock: Knock) {
    return getDistanceByTowPoints(
      knock.recordX,
      knock.recordY,
      knock.x,
      knock.y,
    )
  }

  // 获取从起始点到结束点的方向
  function getDirectionWhenEnd(knock: Knock) {
    return getDirectionByTwoPoints(knock.startX, knock.startY, knock.x, knock.y)
  }

  // 获取记录点到当前点的方向
  function getDirectionWhenMoving(knock: Knock) {
    return getDirectionByTwoPoints(
      knock.recordX,
      knock.recordY,
      knock.x,
      knock.y,
    )
  }

  // 获取一根手指的有效期（从按下到抬起之间的时间）
  function getExpires(knock: Knock) {
    return knock.time - knock.startTime
  }

  // 清空所有手指
  function clear() {
    for (const k in knocks) {
      delete knocks[k]
    }
  }

  // 计算手指个数
  function count() {
    return Object.keys(knocks).length
  }

  return {
    knocks,
    add,
    remove,
    update,
    track,
    getStartDistance,
    getRecordDistance,
    getDirectionWhenEnd,
    getDirectionWhenMoving,
    getExpires,
    clear,
    count,
  }
}
