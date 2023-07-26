import { getLenOfTouches, getDistanceByTowPoints, getAngle360 } from './utils'
import { Knocks, Knock } from './createFingers'
import { StrikeTouchList } from './types'

export interface Chopsticks {
  identifiers: number[]
  getTarget(): EventTarget | null
  beforeDegrees: number
  degrees: number
  isPaired(): boolean
  update(touches: StrikeTouchList): boolean
  remove(
    touches: StrikeTouchList,
    ev: TouchEvent,
    callback: (identifiers: number[]) => void,
  ): void
  getDistance(): number
  getAngle(): number
  isMove(touches: StrikeTouchList): boolean
  getOrigin(identifiers?: number[]): [number, number]
  beforeDistance: number
  startDistance: number
  distance: number
  scale: number
  startAngle: number
  clear(): void
  originKnock: Knock | null
}

export function createChopsticks(knocks: Knocks): Chopsticks {
  const identifiers: number[] = []
  let target: EventTarget | null = null

  // 判断是否是一双筷子
  function isPaired() {
    return identifiers.length === 2
  }

  // 更新筷子，如果返回true，说明筷子数由0或1变为2
  function update(/*changedTouches*/ touches: StrikeTouchList) {
    const len = identifiers.length

    switch (len) {
      case 0:
        target = touches[0].target
        identifiers.push(touches[0].identifier)
        if (touches.length > 1) {
          identifiers.push(touches[1].identifier)
        }
        break
      case 1:
        identifiers.push(touches[0].identifier)
        break
    }

    if (len !== identifiers.length && identifiers.length === 2) {
      return true
    }
    return false
  }

  // 移除筷子，如果返回true，说明筷子由两根变少
  function remove(
    touches: StrikeTouchList,
    ev: TouchEvent,
    callback: (identifiers: number[]) => void,
  ) {
    const len = identifiers.length
    const oldIdentifiers = identifiers.slice()
    let i = 0,
      j = 0,
      touch

    for (; (touch = touches[i++]); ) {
      for (; j < len; ) {
        if (touch.identifier === identifiers[j++]) {
          identifiers.splice(--j, 1)
        }
      }
    }

    const changed = len !== identifiers.length

    /**！！！！！！！！！！！！！！！！！！！！！
     * 这条语句非常有用，解决了一个大bug：
     * 当两根手指同时接触屏幕时，bug就产生了，只会触发pinchend事件，
     * 而pinchstart和pinchmove永远不会触发，目前还找不到原因。
     * 但是，通过判断如果没有手指在屏幕上，则清空chopsticks数组，似乎可以解决问题。
     */
    if (getLenOfTouches(ev) === 0) {
      identifiers.length = 0
    }

    if (changed && len === 2) {
      callback(oldIdentifiers)
    }
  }

  // 获取两根筷子间的距离
  function getDistance() {
    const knock1 = knocks[identifiers[0]]
    const knock2 = knocks[identifiers[1]]
    return getDistanceByTowPoints(knock1.x, knock1.y, knock2.x, knock2.y)
  }

  // 获取两根筷子间的角度
  function getAngle() {
    const knock1 = knocks[identifiers[0]]
    const knock2 = knocks[identifiers[1]]
    return ~~getAngle360(knock1.x, knock1.y, knock2.x, knock2.y)
  }

  // 判断移动的是否是筷子
  function isMove(touches: StrikeTouchList) {
    return touches.some((touch) => {
      return identifiers.some((id) => id === touch.identifier)
    })
  }

  // 获取两点线段中心点坐标
  function getOrigin(chops: number[] = identifiers): [number, number] {
    const knock1 = knocks[chops[0]]
    const knock2 = knocks[chops[1]]

    return [(knock1.x + knock2.x) / 2, (knock1.y + knock2.y) / 2]
  }

  // 清空筷子
  function clear() {
    identifiers.length = 0
  }

  return {
    identifiers,
    beforeDistance: 0,
    startDistance: 0,
    distance: 0,
    scale: 0,
    startAngle: 0,
    beforeDegrees: 0,
    degrees: 0,
    getTarget: () => target,
    isPaired,
    update,
    remove,
    getDistance,
    getAngle,
    isMove,
    getOrigin,
    clear,
    originKnock: null,
  }
}
