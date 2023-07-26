import { Fingers, Knock } from './createFingers'
import { createGestures } from './createGestures'
import { Chopsticks } from './createChopsticks'
import { DefaultConfig } from './defaultConfig'
import { preventDefault } from '../utils'

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
  (event: TouchEvent): void
}

function createHandler(
  fingers: Fingers,
  chopsticks: Chopsticks,
  gestures: ReturnType<typeof createGestures>,
  config: DefaultConfig,
): StrikeInputHandler {
  let firstDirectionJudge: 'pending' | 'correct' | 'incorrect' = 'pending'

  return (event: TouchEvent) => {
    const touches = Array.from(event.touches).map((touch) => ({
      clientX: touch.clientX,
      clientY: touch.clientY,
      identifier: touch.identifier,
      target: touch.target,
    }))

    switch (event.type) {
      case 'touchstart':
        fingers.add(event.currentTarget, touches, (knock: Knock) => {
          if (knock.firstFinger) {
            gestures.pan.down(event, knock)
            gestures.press.down(event, knock)
          }

          if (config.rotate || config.pinch) {
            if (chopsticks.update(touches)) {
              gestures.pinch.down(event, knock)
              gestures.rotate.down(event, knock)
            }
          }
        })

        break

      case 'touchmove':
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
              gestures.rotate.up(event, knock)
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
  gestures: ReturnType<typeof createGestures>,
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
  }

  function unbind() {
    removeEventListeners(el, TOUCH_TARGET_EVENTS, handler)
  }

  return {
    bind,
    unbind,
    handler: handler as StrikeInputHandler,
  }
}
