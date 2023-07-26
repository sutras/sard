import { PubSub } from '../utils/createPubSub'
import { createKnock, Fingers, Knock, updateKnock } from './createFingers'
import { Chopsticks } from './createChopsticks'
import { getDistanceByTowPoints, getDirectionByTwoPoints } from './utils'
import { DefaultConfig } from './defaultConfig'
import { preventDefault } from '../utils'

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
  pubSub: PubSub,
  config: DefaultConfig,
) {
  const { emit } = pubSub

  // 记录最后一次tap的时间
  let lastTapTime = 0

  // 记录最后一次tap的坐标
  let lastTapX: number
  let lastTapY: number
  let doubleTapStatus = 0 // 双击成立的状态

  function agentEmit<E>(type: string, payload: object, event: Event) {
    emit(type, {
      ...payload,
      type,
      originalEvent: event,
    } as E)
  }

  return {
    tap: {
      up(event, knock: Knock) {
        if (!config.tap) {
          return
        }

        if (
          fingers.getExpires(knock) <= config.tapMaxTime &&
          fingers.getStartDistance(knock) <= config.tapMaxDistance
        ) {
          // 触发tap事件
          agentEmit<StrikeTapEvent>(TAP, knock, event)

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
              agentEmit<StrikeDoubleTapEvent>(DOUBLE_TAP, knock, event)
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
      down(event: TouchEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        knock.pressTimer = setTimeout(function () {
          if (fingers.getStartDistance(knock) <= config.pressMaxDistance) {
            preventDefault(event)
            knock.isPress = true
            agentEmit<StrikePressEvent>(PRESS_DOWN, knock, event)
          }
        }, config.pressMinTime) as unknown as number
      },
      move(event: TouchEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        if (knock.isPress) {
          if (event.type === 'mousemove') {
            preventDefault(event)
          }
          agentEmit<StrikePressEvent>(PRESS_MOVE, knock, event)
        }
      },
      up(event: TouchEvent, knock: Knock) {
        if (!config.press) {
          return
        }

        if (knock.pressTimer) {
          clearTimeout(knock.pressTimer)
          knock.pressTimer = 0
        }
        if (knock.isPress) {
          knock.isPress = false
          preventDefault(event)
          agentEmit<StrikePressEvent>(PRESS_UP, knock, event)
        }
      },
    },
    swipe: {
      up(event: TouchEvent, knock: Knock) {
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

          agentEmit<StrikeSwipeEvent>(SWIPE, payload, event)
          agentEmit<StrikeSwipeEvent>(SWIPE + direction, payload, event)
        }
      },
    },
    pan: {
      down(event: TouchEvent, knock: Knock) {
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
          event,
        )
      },
      move(event: TouchEvent, knock: Knock) {
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

          agentEmit<StrikePanEvent>(PAN_MOVE, payload, event)
          agentEmit<StrikePanEvent>(PAN + direction, payload, event)

          knock.recordX = knock.x
          knock.recordY = knock.y
        }
      },
      up(event: TouchEvent, knock: Knock) {
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
          agentEmit<StrikePanEvent>(PAN_SWIPE + direction, payload, event)
        }

        // panend
        agentEmit<StrikePanEvent>(PAN_END, payload, event)
      },
    },
    rotate: {
      down(event: TouchEvent) {
        if (!config.rotate) {
          return
        }

        chopsticks.startAngle = chopsticks.getAngle()
        agentEmit<StrikeRotateEvent>(
          ROTATE_START,
          {
            degrees: 0,
          },
          event,
        )
      },
      move(event: TouchEvent) {
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
            event,
          )
        }
      },
      up(event: TouchEvent) {
        if (!config.rotate) {
          return
        }

        chopsticks.beforeDegrees = 0

        agentEmit<StrikeRotateEvent>(
          ROTATE_END,
          {
            degrees: chopsticks.degrees,
          },
          event,
        )
      },
    },
    pinch: {
      down(event: TouchEvent, knock: Knock) {
        if (!config.pinch) {
          return
        }
        chopsticks.beforeDistance = chopsticks.startDistance =
          chopsticks.getDistance()

        const [x, y] = chopsticks.getOrigin()
        const originKnock = createKnock(knock.currentTarget, x, y)

        chopsticks.originKnock = originKnock

        agentEmit<StrikePinchEvent>(
          PINCH_START,
          {
            scale: 1,
            previews: chopsticks.identifiers[0],
            next: chopsticks.identifiers[1],
            ...originKnock,
          },
          event,
        )
      },
      move(event: TouchEvent) {
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

          agentEmit<StrikePinchEvent>(PINCH_MOVE, payload, event)
          if (isOut) {
            agentEmit<StrikePinchEvent>(PINCH_OUT, payload, event)
          } else if (isIn) {
            agentEmit<StrikePinchEvent>(PINCH_IN, payload, event)
          }
          chopsticks.beforeDistance = chopsticks.distance
        }
      },
      up(event: TouchEvent, knock: Knock, identifiers: number[]) {
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

        agentEmit<StrikePinchEvent>(PINCH_END, payload, event)
      },
    },
  }
}
