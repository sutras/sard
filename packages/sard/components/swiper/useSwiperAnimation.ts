import { createAnimation, type Timeline } from 'lwa'
import { onUnmounted, type Ref } from 'vue'
import { withResolvers } from '../../utils'

export function useSwiperAnimation(target: Ref<number>) {
  let tl: undefined | Timeline
  let promiseWithResolvers: PromiseWithResolvers<void>

  const play = (value: number, duration: number, update: () => void) => {
    tl?.pause()

    promiseWithResolvers = withResolvers<void>()

    tl = createAnimation(
      target,
      {
        value,
      },
      {
        duration,
        easing: 'easeOutCubic',
        update,
        complete() {
          promiseWithResolvers.resolve()
        },
      },
    )
    return promiseWithResolvers.promise
  }

  const pause = () => {
    tl?.pause()
  }

  onUnmounted(() => {
    pause()
  })

  return {
    play,
    pause,
  }
}
