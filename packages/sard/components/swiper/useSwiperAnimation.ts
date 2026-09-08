import { onUnmounted, type Ref } from 'vue'
import { animateNumber, type Animation } from '../../utils/animation'
import { withResolvers } from '../../utils'

export function useSwiperAnimation(target: Ref<number>) {
  let animation: undefined | Animation
  let promiseWithResolvers: PromiseWithResolvers<void>

  const play = (value: number, duration: number, update: () => void) => {
    animation?.pause()

    promiseWithResolvers = withResolvers<void>()

    animation = animateNumber(target, value, {
      duration,
      easing: 'easeOutCubic',
      update,
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
