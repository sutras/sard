import { Text, View } from '@tarojs/components'
import { AnyFunction } from '../base'
import { noop } from '../utils'

class AnimatedInterpolation {
  constructor(config: Record<string, any>) {
    void config
  }
}

class AnimatedValue {
  constructor(value: number, config?: Record<string, any>) {
    void value
    void config
  }

  setValue(value: number) {
    void value
  }

  setOffset(offset: number) {
    void offset
  }

  flattenOffset() {
    void null
  }

  extractOffset() {
    void null
  }

  interpolate(config: Record<string, any>) {
    return new AnimatedInterpolation(config)
  }

  stopAnimation() {
    void null
  }

  addListener(callback: (state: { value: number }) => void) {
    void callback
    return ''
  }

  removeListener(id: string) {
    void id
  }

  removeAllListeners() {
    void null
  }
}

class CompositeAnimation {
  constructor(value: any, config?: Record<string, any>) {
    void value
    void config
  }

  start(callback?: (result: { finished: boolean }) => void) {
    void callback
  }

  stop() {
    void null
  }

  reset() {
    void null
  }
}

function timing(value: AnimatedValue, config: Record<string, any>) {
  return new CompositeAnimation(value, config)
}

function loop(animation: CompositeAnimation, config?: Record<string, any>) {
  return new CompositeAnimation(animation, config)
}

function parallel(
  animations: Array<CompositeAnimation>,
  config?: Record<string, any>,
) {
  return new CompositeAnimation(animations, config)
}

function sequence(animations: any[]) {
  return new CompositeAnimation(animations)
}

function delay(time: number) {
  return new CompositeAnimation(time)
}

class Animated {
  static View = View
  static Text = Text
  static Value = AnimatedValue
  static timing = timing
  static loop = loop
  static parallel = parallel
  static sequence = sequence
  static delay = delay
}

class Easing {
  static step0: AnyFunction = noop
  static step1: AnyFunction = noop
  static linear: AnyFunction = noop
  static ease: AnyFunction = noop
  static quad: AnyFunction = noop
  static cubic: AnyFunction = noop
  static poly: AnyFunction = noop
  static sin: AnyFunction = noop
  static circle: AnyFunction = noop
  static exp: AnyFunction = noop
  static elastic: AnyFunction = noop
  static back: AnyFunction = noop
  static bounce: AnyFunction = noop
  static bezier: AnyFunction = noop
  static in: AnyFunction = noop
  static out: AnyFunction = noop
  static inOut: AnyFunction = noop
}

export { Easing, Animated }
