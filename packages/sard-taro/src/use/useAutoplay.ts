import { useRef, useEffect } from 'react'
import { useEvent } from './useEvent'

export function useAutoplay(
  callback: () => void,
  interval: number,
  autoplay: boolean,
) {
  const timer = useRef(0)

  const play = useEvent(() => {
    stop()
    timer.current = setInterval(() => {
      callback()
    }, interval) as unknown as number
  })

  const stop = useEvent(() => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = 0
    }
  })

  const autoPlay = useEvent(() => {
    if (autoplay) {
      play()
    }
  })

  useEffect(() => {
    if (autoplay) {
      play()
    } else {
      stop()
    }
  }, [autoplay, interval])

  useEffect(
    () => () => {
      stop()
    },
    [],
  )

  return [autoPlay, stop] as [() => void, () => void]
}

export default useAutoplay
