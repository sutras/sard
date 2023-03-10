import { createInput } from './createInput'
import { createGestures } from './createGestures'
import { createFingers } from './createFingers'
import { createPubSub, PubSub } from '../utils/createPubSub'
import { createChopsticks } from './createChopsticks'
import { defaultConfig, PartialConfig } from './defaultConfig'

export type { PartialConfig } from './defaultConfig'

export interface Strike extends PubSub {
  init(): void
  destroy(): void
  configure(partialConfig?: PartialConfig): void
}

export function createStrike(
  el: EventTarget,
  partialConfig?: PartialConfig,
): Strike {
  const config = Object.assign({}, defaultConfig, partialConfig)
  let initialized = false

  const pubSub = createPubSub()
  const fingers = createFingers(config)
  const chopsticks = createChopsticks(fingers.knocks)
  const gestures = createGestures(fingers, chopsticks, pubSub, config)
  const input = createInput(el, fingers, chopsticks, gestures, config)

  function init() {
    if (initialized) {
      return
    }
    input.bind()
    initialized = true
  }

  function destroy() {
    if (!initialized) {
      return
    }
    input.unbind()
    pubSub.off()
    fingers.clear()
    chopsticks.clear()
    initialized = false
  }

  function configure(partialConfig?: PartialConfig) {
    Object.assign(config, partialConfig)
  }

  if (config.init) {
    init()
  }

  return {
    ...pubSub,
    init,
    destroy,
    configure,
  }
}
