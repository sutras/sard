import { onMounted, watch } from 'vue'
import { useTimeout } from '../../use'

export function useSwiperAutoPlay(
  callback: () => void,
  {
    delay,
    enabled,
  }: {
    delay: () => number
    enabled: () => boolean
  },
) {
  const timer = useTimeout()

  function autoPlay() {
    timer.set(callback, delay())
  }

  function stopAutoPlay() {
    timer.clear()
  }

  watch(enabled, (enabled) => {
    if (enabled) {
      autoPlay()
    } else {
      stopAutoPlay()
    }
  })

  onMounted(() => {
    if (enabled()) {
      autoPlay()
    }
  })

  return {
    autoPlay,
    stopAutoPlay,
  }
}
