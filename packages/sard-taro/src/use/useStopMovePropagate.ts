import { useCallback, useEffect } from 'react'

export function useStopMovePropagate<T>(
  ref: React.RefObject<T>,
  immediate?: boolean,
) {
  const handler = useCallback((event: Event) => {
    if (immediate) {
      event.stopImmediatePropagation()
    } else {
      event.stopPropagation()
    }
  }, [])

  const on = useCallback(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener('touchmove', handler, {
        passive: false,
      })
    }
  }, [])

  const off = useCallback(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.removeEventListener('touchmove', handler)
    }
  }, [])

  useEffect(() => {
    on()
    return off
  }, [])

  return { on, off } as const
}

export default useStopMovePropagate
