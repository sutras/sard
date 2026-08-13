import { getTwoPointsDistance } from '../utils'
import { useTimeout } from './useTimeout'

const ERROR_VALUE = 10
const MIN_TIME = 350

export function useSimulatedDblClick(options: {
  onDblClick?: (x: number, y: number) => void
  onClick?: (x: number, y: number) => void
}) {
  const { onDblClick, onClick } = options
  let downCoord = { x: 0, y: 0 }
  let startTime = 0

  const timer = useTimeout()

  const onTouchStart = (event: TouchEvent) => {
    startTime = Date.now()

    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (event.touches.length) return

    const upCoord = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    }

    const distance = getTwoPointsDistance(downCoord, upCoord)
    if (distance < ERROR_VALUE && Date.now() - startTime < MIN_TIME) {
      if (timer.isPending) {
        timer.clear()
        onDblClick?.(downCoord.x, downCoord.y)
      } else {
        timer.set(() => {
          onClick?.(downCoord.x, downCoord.y)
        }, MIN_TIME)
      }
    }
  }

  return [onTouchStart, onTouchEnd] as const
}
