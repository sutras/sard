import { toTouchEvent } from '../utils'

export function usePointerDown(
  onStart?: (event: TouchEvent) => void,
  onMove?: (event: TouchEvent) => void,
  onEnd?: (event: TouchEvent) => void,
) {
  return (event: PointerEvent) => {
    if ('ontouchstart' in document) {
      return
    }

    onStart?.(toTouchEvent(event))

    const moveHandler = (event: PointerEvent) => {
      event.preventDefault()
      onMove?.(toTouchEvent(event))
    }

    const upHandler = (event: PointerEvent) => {
      onEnd?.(toTouchEvent(event, true))
      document.removeEventListener('pointermove', moveHandler)
      document.removeEventListener('pointerup', upHandler)
    }

    document.addEventListener('pointermove', moveHandler)
    document.addEventListener('pointerup', upHandler)
  }
}
