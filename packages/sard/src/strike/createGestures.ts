import { EventType } from './createEvent'
import { createKnock, Fingers, Knock, updateKnock } from './createFingers'
import { Chopsticks } from './createChopsticks'
import { getDistanceByTowPoints, getDirectionByTwoPoints } from './utils'
import { DefaultConfig } from './defaultConfig'

const UP = 'up'
const RIGHT = 'right'
const DOWN = 'down'
const LEFT = 'left'
const START = 'start'
const MOVE = 'move'
const END = 'end'

export const TAP = 'tap'
export const DOUBLE_TAP = 'doubletap'

const PRESS = 'press'
export const PRESS_DOWN = PRESS + DOWN
export const PRESS_MOVE = PRESS + MOVE
export const PRESS_UP = PRESS + UP

const PAN = 'pan'
export const PAN_START = PAN + START
export const PAN_MOVE = PAN + MOVE
export const PAN_END = PAN + END
export const PAN_UP = PAN + UP
export const PAN_RIGHT = PAN + RIGHT
export const PAN_DOWN = PAN + DOWN
export const PAN_LEFT = PAN + LEFT

const SWIPE = 'swipe'
export const SWIPE_UP = SWIPE + UP
export const SWIPE_RIGHT = SWIPE + RIGHT
export const SWIPE_DOWN = SWIPE + DOWN
export const SWIPE_LEFT = SWIPE + LEFT

export const PAN_SWIPE = PAN + SWIPE
export const PAN_SWIPE_UP = PAN_SWIPE + UP
export const PAN_SWIPE_RIGHT = PAN_SWIPE + RIGHT
export const PAN_SWIPE_DOWN = PAN_SWIPE + DOWN
export const PAN_SWIPE_LEFT = PAN_SWIPE + LEFT

const PINCH = 'pinch'
export const PINCH_START = PINCH + START
export const PINCH_MOVE = PINCH + MOVE
export const PINCH_END = PINCH + END
export const PINCH_IN = PINCH + 'in'
export const PINCH_OUT = PINCH + 'out'

const ROTATE = 'rotate'
export const ROTATE_START = ROTATE + START
export const ROTATE_MOVE = ROTATE + MOVE
export const ROTATE_END = ROTATE + END

type TouchOrMouseEvent = TouchEvent | MouseEvent

export interface Gestures {
  tap: {
    up: (...args: any[]) => any
  }
  swipe: {
    up: (...args: any[]) => any
  }
  press: {
    down: (...args: any[]) => any
    move: (...args: any[]) => any
    up: (...args: any[]) => any
  }
  pan: {
    down: (...args: any[]) => any
    move: (...args: any[]) => any
    up: (...args: any[]) => any
  }
  rotate: {
    down: (...args: any[]) => any
    move: (...args: any[]) => any
    up: (...args: any[]) => any
  }
  pinch: {
    down: (...args: any[]) => any
    move: (...args: any[]) => any
    up: (...args: any[]) => any
  }
}

export interface StrikeBaseEvent {
  type: string
  target: EventTarget | null
  originalEvent: Event
}

export interface StrikeKnockEvent extends StrikeBaseEvent, Knock {}

export type StrikeTapEvent = StrikeKnockEvent

export type StrikeDoubleTapEvent = StrikeKnockEvent

export type StrikePressEvent = StrikeKnockEvent

export interface StrikePanEvent extends StrikeKnockEvent {
  swipe: boolean
  inertia: number
  inertiaX: number
  inertiaY: number
  speed: number
  speedX: number
  speedY: number
}

export type StrikeSwipeEvent = StrikeKnockEvent

export interface StrikePinchEvent extends StrikeKnockEvent {
  scale: number
  previous: Knock
  next: Knock
}

export interface StrikeRotateEvent extends StrikeBaseEvent {
  degrees: number
}

export function createGestures(
  fingers: Fingers,
  chopsticks: Chopsticks,
  event: EventType,
  config: DefaultConfig,
): Gestures {
  const { emit } = event
  let lastTapTime = 0 // 记录最后一次tap的时间
  // 记录最后一次tap的坐标
  let lastTapX: number
  let lastTapY: number
  let doubleTapStatus = 0 // 双击成立的状态

  function agentEmit<E>(type: string, payload: any, ev: Event) {
    emit(payload.eventTarget, type, {
      ...payload,
      type,
      originalEvent: ev,
    } as E)
  }

  return {
    tap: {
      up(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.tap) {
          return
        }

        if (
          fingers.getExpires(knock) <= config.tapMaxTime &&
          fingers.getStartDistance(knock) <= config.tapMaxDistance
        ) {
          // 触发tap事件
          agentEmit<StrikeTapEvent>(TAP, knock, ev)

          doubleTapStatus++

          if (doubleTapStatus === 2) {
            if (
              knock.startTime - lastTapTime <= config.doubleTabMaxTime &&
              getDistanceByTowPoints(
                lastTapX,
                lastTapY,
                knock.startX,
                knock.startY,
              ) <= config.doubleTabMaxDistance
            ) {
              agentEmit<StrikeDoubleTapEvent>(DOUBLE_TAP, knock, ev)
              doubleTapStatus = 0
            } else {
              doubleTapStatus--
            }
          }

          lastTapTime = Date.now()
          lastTapX = knock.x
          lastTapY = knock.y
        }
      },
    },
    press: {
      down(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        knock.pressTimer = setTimeout(function () {
          if (fingers.getStartDistance(knock) <= config.pressMaxDistance) {
            if (ev.type === 'mousedown') {
              ev.preventDefault()
            }
            knock.isPress = true
            agentEmit<StrikePressEvent>(PRESS_DOWN, knock, ev)
          }
        }, config.pressMinTime) as unknown as number
      },
      move(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        if (knock.isPress) {
          if (ev.type === 'mousemove') {
            ev.preventDefault()
          }
          agentEmit<StrikePressEvent>(PRESS_MOVE, knock, ev)
        }
      },
      up(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        if (knock.pressTimer) {
          clearTimeout(knock.pressTimer)
          knock.pressTimer = 0
        }
        if (knock.isPress) {
          knock.isPress = false
          agentEmit<StrikePressEvent>(PRESS_UP, knock, ev)
        }
      },
    },
    swipe: {
      up(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.swipe) {
          return
        }

        if (
          fingers.getExpires(knock) <= config.swipeMaxTime &&
          fingers.getStartDistance(knock) >= config.swipeMinDistance
        ) {
          const direction = fingers.getDirectionWhenEnd(knock)
          const payload = {
            ...knock,
            direction,
          }

          agentEmit<StrikeSwipeEvent>(SWIPE, payload, ev)
          agentEmit<StrikeSwipeEvent>(SWIPE + direction, payload, ev)
        }
      },
    },
    pan: {
      down(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.pan) {
          return
        }

        // pan start
        agentEmit<StrikePanEvent>(
          PAN_START,
          {
            ...knock,
            swipe: false,
          },
          ev,
        )
      },
      move(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.pan) {
          return
        }

        // panmove、pan+direction
        // 上一次触发的点与当前点距离超过一定值才能触发
        if (fingers.getRecordDistance(knock) >= config.panMinDistance) {
          const direction = (knock.direction =
            fingers.getDirectionWhenMoving(knock))
          const payload = {
            ...knock,
            swipe: false,
            direction,
          }

          fingers.track(knock)
          agentEmit<StrikePanEvent>(PAN_MOVE, payload, ev)
          agentEmit<StrikePanEvent>(PAN + direction, payload, ev)

          knock.recordX = knock.x
          knock.recordY = knock.y
        }
      },
      up(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.pan) {
          return
        }

        fingers.track(knock)
        const tracks = knock.tracks
        const firstPoint = tracks[0]
        const lastPoint = tracks[tracks.length - 1]

        const payload = {
          ...knock,
          speed: 0,
          speedX: 0,
          speedY: 0,
          inertia: 0,
          inertiaX: 0,
          inertiaY: 0,
          swipe: false,
        }

        if (tracks.length > 2) {
          const distance = getDistanceByTowPoints(
            firstPoint.x,
            firstPoint.y,
            lastPoint.x,
            lastPoint.y,
          )
          if (distance > config.panMinDistance) {
            payload.inertia = distance
            payload.speed = distance / (lastPoint.time - firstPoint.time)
          }

          const distanceX = lastPoint.x - firstPoint.x
          if (Math.abs(distanceX) > config.panMinDistance) {
            payload.inertiaX = distanceX
            payload.speedX = distanceX / (lastPoint.time - firstPoint.time)
          }

          const distanceY = lastPoint.y - firstPoint.y
          if (Math.abs(distanceY) > config.panMinDistance) {
            payload.inertiaY = distanceY
            payload.speedY = distanceY / (lastPoint.time - firstPoint.time)
          }
        }

        // panSwipe
        if (payload.speed >= config.panSwipeMinSpeed) {
          const direction = getDirectionByTwoPoints(
            firstPoint.x,
            firstPoint.y,
            lastPoint.x,
            lastPoint.y,
          )
          payload.direction = direction
          payload.swipe = true
          agentEmit<StrikePanEvent>(PAN_SWIPE + direction, payload, ev)
        }

        // panend
        agentEmit<StrikePanEvent>(PAN_END, payload, ev)
      },
    },
    rotate: {
      down(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.rotate) {
          return
        }

        chopsticks.startAngle = chopsticks.getAngle()
        agentEmit<StrikeRotateEvent>(
          ROTATE_START,
          {
            degrees: 0,
          },
          ev,
        )
      },
      move(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.rotate) {
          return
        }

        /**************************
         * 也许你可以告诉我这段代码的作用
         */
        chopsticks.degrees = chopsticks.getAngle() - chopsticks.startAngle

        let count = 0
        while (
          Math.abs(chopsticks.degrees - chopsticks.beforeDegrees) > 90 &&
          count++ < 50
        ) {
          if (chopsticks.beforeDegrees < 0) {
            chopsticks.degrees -= 180
          } else {
            chopsticks.degrees += 180
          }
        }
        // **************************

        // 角度较之前有所改变才触发事件
        if (chopsticks.degrees !== chopsticks.beforeDegrees) {
          chopsticks.beforeDegrees = chopsticks.degrees

          agentEmit<StrikeRotateEvent>(
            ROTATE_MOVE,
            {
              degrees: chopsticks.degrees,
            },
            ev,
          )
        }
      },
      up(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.rotate) {
          return
        }

        chopsticks.beforeDegrees = 0

        agentEmit<StrikeRotateEvent>(
          ROTATE_END,
          {
            degrees: chopsticks.degrees,
          },
          ev,
        )
      },
    },
    pinch: {
      down(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.pinch) {
          return
        }
        chopsticks.beforeDistance = chopsticks.startDistance =
          chopsticks.getDistance()

        const [x, y] = chopsticks.getOrigin()
        const originKnock = createKnock(
          knock.eventTarget,
          knock.currentTarget,
          x,
          y,
        )

        chopsticks.originKnock = originKnock

        agentEmit<StrikePinchEvent>(
          PINCH_START,
          {
            scale: 1,
            previews: chopsticks.identifiers[0],
            next: chopsticks.identifiers[1],
            ...originKnock,
          },
          ev,
        )
      },
      move(ev: TouchOrMouseEvent, knock: Knock) {
        if (!config.pinch) {
          return
        }
        chopsticks.distance = chopsticks.getDistance()

        const isOut =
          chopsticks.distance - chopsticks.beforeDistance >=
          config.pinchMinDistance
        const isIn =
          chopsticks.beforeDistance - chopsticks.distance >=
          config.pinchMinDistance

        if (isOut || isIn) {
          chopsticks.scale = chopsticks.distance / chopsticks.startDistance

          const originKnock = chopsticks.originKnock as Knock

          const [x, y] = chopsticks.getOrigin()
          updateKnock(originKnock, x, y, config.lockDirectionDistance)

          const payload = {
            scale: chopsticks.scale,
            previews: chopsticks.identifiers[0],
            next: chopsticks.identifiers[1],
            ...originKnock,
          }

          agentEmit<StrikePinchEvent>(PINCH_MOVE, payload, ev)
          if (isOut) {
            agentEmit<StrikePinchEvent>(PINCH_OUT, payload, ev)
          } else if (isIn) {
            agentEmit<StrikePinchEvent>(PINCH_IN, payload, ev)
          }
          chopsticks.beforeDistance = chopsticks.distance
        }
      },
      up(ev: TouchOrMouseEvent, knock: Knock, identifiers: number[]) {
        if (!config.pinch) {
          return
        }

        const originKnock = chopsticks.originKnock as Knock

        const [x, y] = chopsticks.getOrigin(identifiers)
        updateKnock(originKnock, x, y, config.lockDirectionDistance)

        const payload = {
          scale: chopsticks.scale,
          previews: identifiers[0],
          next: identifiers[1],
          ...originKnock,
        }

        agentEmit<StrikePinchEvent>(PINCH_END, payload, ev)
      },
    },
  }
}
