import { getTwoPointsDistance } from '../utils'
import { useTimeout } from './useTimeout'

export interface UseSimulatedPressOptions {
  start?: () => void
  move?: (
    event: TouchEvent,
    extra: {
      delta: {
        x: number
        y: number
      }
    },
  ) => void
  end?: () => void
  duration?: number
}

export function useSimulatedPress(options: UseSimulatedPressOptions = {}) {
  const { start, move, end, duration = 500 } = options

  let downCoord = { x: 0, y: 0 }
  let isPressing = false

  const pressTimer = useTimeout()

  const onTouchStart = (event: TouchEvent) => {
    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    pressTimer.set(() => {
      isPressing = true
      start?.()
    }, duration)
  }

  const onTouchMove = (event: TouchEvent) => {
    const moveCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    if (isPressing) {
      move?.(event, {
        delta: {
          x: moveCoord.x - downCoord.x,
          y: moveCoord.y - downCoord.y,
        },
      })
    } else if (pressTimer.isPending) {
      const distance = getTwoPointsDistance(downCoord, moveCoord)
      if (distance > 10) {
        pressTimer.clear()
      }
    }
  }

  const onTouchEnd = () => {
    pressTimer.clear()

    if (isPressing) {
      isPressing = false
      end?.()
    }
  }

  return [onTouchStart, onTouchMove, onTouchEnd] as const
}
