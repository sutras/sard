import { onUnmounted, type Ref } from 'vue'
import { animateNumber, type Animation } from '../animation'
import { withResolvers } from '../polyfill'

export function useEasingAnimation(target: Ref<number>) {
  let animation: undefined | Animation
  let promiseWithResolvers: PromiseWithResolvers<void>

  const play = (value: number, duration: number) => {
    animation?.pause()

    promiseWithResolvers = withResolvers<void>()

    animation = animateNumber(target, value, {
      duration,
      easing: 'easeOutCubic',
      complete() {
        promiseWithResolvers.resolve()
      },
    })
    return promiseWithResolvers.promise
  }

  const pause = () => {
    animation?.pause()
  }

  onUnmounted(() => {
    pause()
  })

  return {
    play,
    pause,
  }
}
