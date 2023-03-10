import { Fingers, Knock } from './createFingers'
import { Gestures } from './createGestures'
import { Chopsticks } from './createChopsticks'
import { DefaultConfig } from './defaultConfig'
import { SyntheticTouches } from './types'
import { SUPPORT_TOUCH } from './utils'
import { preventDefault } from '../utils/dom'

const MOUSE_TARGET_EVENTS = 'mousedown'
const MOUSE_WINDOW_EVENTS = 'mousemove mouseup'
const TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel'

function directionGuard(config: DefaultConfig, knock: Knock) {
  if (config.lockDirection) {
    return (
      config.direction === 'all' || config.direction === knock.lockDirection
    )
  } else {
    return config.direction !== 'none'
  }
}

export interface StrikeInputHandler {
  (event: MouseEvent | TouchEvent): void
}

function createHandler(
  fingers: Fingers,
  chopsticks: Chopsticks,
  gestures: Gestures,
  config: DefaultConfig,
): StrikeInputHandler {
  let isMouseDown = false
  let firstDirectionJudge: 'pending' | 'correct' | 'incorrect' = 'pending'

  return (event: MouseEvent | TouchEvent) => {
    const type = event.type
    let touches: SyntheticTouches
    const isTouch = 'touches' in event

    // 避免同时触发 mouse 和 touch 事件
    if (SUPPORT_TOUCH && !isTouch) {
      return
    }

    if (isTouch) {
      touches = Array.from((event as TouchEvent).changedTouches).map(
        (touch) => ({
          clientX: touch.clientX,
          clientY: touch.clientY,
          identifier: touch.identifier,
          target: touch.target,
        }),
      )
    } else {
      touches = [
        {
          clientX: (event as MouseEvent).clientX,
          clientY: (event as MouseEvent).clientY,
          identifier: 0,
          target: event.target as EventTarget,
        },
      ]
    }

    switch (type) {
      case 'touchstart':
      case 'mousedown':
        if (!isTouch) {
          isMouseDown = true
        }

        fingers.add(
          event.currentTarget as EventTarget,
          touches,
          (knock: Knock) => {
            if (knock.firstFinger) {
              gestures.pan.down(event, knock)
              gestures.press.down(event, knock)
            }

            if (config.rotate || config.pinch) {
              // 凑齐筷子
              if (chopsticks.update(touches)) {
                if (type === 'mousedown') {
                  preventDefault(event)
                }
                gestures.pinch.down(event, knock)
                gestures.rotate.down(event, knock)
              }
            }
          },
        )

        break
      case 'touchmove':
      case 'mousemove':
        if (!isTouch && !isMouseDown) {
          return
        }

        if (firstDirectionJudge === 'correct') {
          preventDefault(event)
        }

        fingers.update(touches, (knock: Knock) => {
          if (knock.firstFinger) {
            if (config.swipe || config.pan) {
              if (firstDirectionJudge === 'pending') {
                const correct = directionGuard(config, knock)
                if (correct) {
                  knock.expectedDirection = true
                  firstDirectionJudge = 'correct'
                } else {
                  firstDirectionJudge = 'incorrect'
                }
              }
              if (firstDirectionJudge === 'correct') {
                gestures.pan.move(event, knock)
              }
            }
            gestures.press.move(event, knock)
          }

          if (
            (config.rotate || config.pinch) &&
            chopsticks.isPaired() &&
            chopsticks.isMove(touches)
          ) {
            preventDefault(event)
            gestures.pinch.move(event, knock)
            gestures.rotate.move(event, knock)
          }
        })

        break
      case 'touchend':
      case 'touchcancel':
      case 'mouseup':
        if (!isTouch && !isMouseDown) {
          return
        }
        if (!isTouch) {
          isMouseDown = false
        }
        firstDirectionJudge = 'pending'

        fingers.update(touches, (knock: Knock) => {
          if (knock.firstFinger) {
            gestures.tap.up(event, knock)
            gestures.swipe.up(event, knock)
            gestures.pan.up(event, knock)
            gestures.press.up(event, knock)
          }

          if (config.rotate || config.pinch) {
            chopsticks.remove(touches, event, (chopsticks) => {
              gestures.pinch.up(event, knock, chopsticks)
              gestures.rotate.up(event, knock, chopsticks)
            })
          }
        })

        fingers.remove(touches)
        break
    }
  }
}

function addEventListeners(
  el: EventTarget,
  types: string,
  handler: EventListenerOrEventListenerObject,
) {
  types.split(' ').forEach((type) => {
    el.addEventListener(type, handler, {
      passive: false,
    })
  })
}

function removeEventListeners(
  el: EventTarget,
  types: string,
  handler: EventListenerOrEventListenerObject,
) {
  types.split(' ').forEach((type) => {
    el.removeEventListener(type, handler, false)
  })
}

export function createInput(
  el: EventTarget,
  fingers: Fingers,
  chopsticks: Chopsticks,
  gestures: Gestures,
  config: DefaultConfig,
) {
  const handler = createHandler(
    fingers,
    chopsticks,
    gestures,
    config,
  ) as EventListener

  function bind() {
    addEventListeners(el, TOUCH_TARGET_EVENTS, handler)
    addEventListeners(el, MOUSE_TARGET_EVENTS, handler)
    addEventListeners(window, MOUSE_WINDOW_EVENTS, handler)
  }

  function unbind() {
    removeEventListeners(el, TOUCH_TARGET_EVENTS, handler)
    removeEventListeners(el, MOUSE_TARGET_EVENTS, handler)
    removeEventListeners(window, MOUSE_WINDOW_EVENTS, handler)
  }

  return {
    bind,
    unbind,
    handler: handler as StrikeInputHandler,
  }
}
