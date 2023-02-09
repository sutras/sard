import { Fingers, Knock } from './createFingers'
import { Gestures } from './createGestures'
import { Chopsticks } from './createChopsticks'
import { DefaultConfig } from './defaultConfig'
import { SyntheticTouches } from './types'
import { SUPPORT_TOUCH } from './utils'

const MOUSE_WINDOW_EVENTS = 'mousemove mouseup'

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
  (ev: MouseEvent | TouchEvent): void
}

function createHandler(
  fingers: Fingers,
  chopsticks: Chopsticks,
  gestures: Gestures,
  config: DefaultConfig,
): StrikeInputHandler {
  let isMouseDown = false
  let firstDirectionJudge: 'pending' | 'correct' | 'incorrect' = 'pending'

  return (ev: MouseEvent | TouchEvent) => {
    const type = ev.type
    let touches: SyntheticTouches
    const isTouch = 'touches' in ev

    // 避免同时触发 mouse 和 touch 事件
    if (SUPPORT_TOUCH && !isTouch) {
      return
    }

    if (isTouch) {
      touches = Array.from((ev as TouchEvent).changedTouches).map((touch) => ({
        clientX: touch.clientX,
        clientY: touch.clientY,
        identifier: touch.identifier,
        target: touch.target,
      }))
    } else {
      touches = [
        {
          clientX: (ev as MouseEvent).clientX,
          clientY: (ev as MouseEvent).clientY,
          identifier: 0,
          target: ev.target as EventTarget,
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
          ev.currentTarget as EventTarget,
          touches,
          (knock: Knock) => {
            if (knock.firstFinger) {
              gestures.pan.down(ev, knock)
              gestures.press.down(ev, knock)
            }

            if (config.rotate || config.pinch) {
              // 凑齐筷子
              if (chopsticks.update(touches)) {
                if (type === 'mousedown') {
                  ev.preventDefault()
                }
                gestures.pinch.down(ev, knock)
                gestures.rotate.down(ev, knock)
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

        if (firstDirectionJudge === 'correct' && type === 'mousemove') {
          ev.preventDefault()
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
                gestures.pan.move(ev, knock)
              }
            }
            gestures.press.move(ev, knock)
          }

          if (
            (config.rotate || config.pinch) &&
            chopsticks.isPaired() &&
            chopsticks.isMove(touches)
          ) {
            if (type === 'mousemove') {
              ev.preventDefault()
            }
            gestures.pinch.move(ev, knock)
            gestures.rotate.move(ev, knock)
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
            gestures.tap.up(ev, knock)
            gestures.swipe.up(ev, knock)
            gestures.pan.up(ev, knock)
            gestures.press.up(ev, knock)
          }

          if (config.rotate || config.pinch) {
            chopsticks.remove(touches, ev, (chopsticks) => {
              gestures.pinch.up(ev, knock, chopsticks)
              gestures.rotate.up(ev, knock, chopsticks)
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
    el.addEventListener(type, handler, false)
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

  function init() {
    if (typeof window === 'object') {
      addEventListeners(window, MOUSE_WINDOW_EVENTS, handler)
    }
  }

  function destroy() {
    if (typeof window === 'object') {
      removeEventListeners(window, MOUSE_WINDOW_EVENTS, handler)
    }
  }

  return {
    init,
    destroy,
    handler: handler as StrikeInputHandler,
  }
}
