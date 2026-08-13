import { getTwoPointsDistance } from '../utils'
import { useTimeout } from './useTimeout'

const errorValue = 10

export function useSimulatedClick(options: {
  onClick?: (event: TouchEvent) => void
  onTouchStart?: (event: TouchEvent) => void
  onTouchEnd?: (event: TouchEvent) => void
  duration?: number
}) {
  const { duration = 1000, onTouchStart, onTouchEnd, onClick } = options

  let timeout = false
  let downCoord = { x: 0, y: 0 }

  const timer = useTimeout()

  const _onTouchStart = (event: TouchEvent) => {
    onTouchStart?.(event)
    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    timer.set(() => {
      timeout = true
    }, duration)
  }

  const _onTouchEnd = (event: TouchEvent) => {
    onTouchEnd?.(event)

    timer.clear()

    if (!timeout) {
      const upCoord = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      }

      const distance = getTwoPointsDistance(downCoord, upCoord)
      if (distance <= errorValue) {
        onClick?.(event)
      }
    }

    timeout = false
  }

  return [_onTouchStart, _onTouchEnd] as const
}
