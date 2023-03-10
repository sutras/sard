// !!! 废弃了

import { useEffect, RefObject } from 'react'
import { usePropRef } from './usePropRef'

const suportTouch = 'ontouchstart' in document

interface eventType {
  START: 'touchstart' | 'mousedown'
  MOVE: 'touchmove' | 'mousemove'
  END: 'touchend' | 'mouseup'
  CANCEL: 'touchcancel'
}

let eventType: eventType = {
  START: 'touchstart',
  MOVE: 'touchmove',
  END: 'touchend',
  CANCEL: 'touchcancel',
}
if (!suportTouch) {
  eventType = {
    START: 'mousedown',
    MOVE: 'mousemove',
    END: 'mouseup',
    CANCEL: 'touchcancel',
  }
}

interface ClientCoord {
  clientX: number
  clientY: number
}

export function useTouchEvent(
  viewRef: RefObject<any>,
  startHandler: (
    event: MouseEvent | TouchEvent,
    clientX: number,
    clientY: number,
  ) => void,
  moveHandler: (
    event: MouseEvent | TouchEvent,
    clientX: number,
    clientY: number,
  ) => void,
  endHandler: (event: MouseEvent | TouchEvent) => void,
) {
  const startHandlerRef = usePropRef(startHandler)
  const moveHandlerRef = usePropRef(moveHandler)
  const endHandlerRef = usePropRef(endHandler)

  useEffect(() => {
    function handleStart(this: any, event: MouseEvent | TouchEvent) {
      if (!suportTouch) {
        document.addEventListener(eventType.MOVE, handleMove)
        document.addEventListener(eventType.END, handleEnd)
      }
      const coord: ClientCoord = suportTouch
        ? (<TouchEvent>event).touches[0]
        : <MouseEvent>event

      startHandlerRef.current.apply(this, [event, coord.clientX, coord.clientY])
    }

    function handleMove(this: any, event: MouseEvent | TouchEvent) {
      const coord: ClientCoord = suportTouch
        ? (<TouchEvent>event).touches[0]
        : <MouseEvent>event

      moveHandlerRef.current.apply(this, [event, coord.clientX, coord.clientY])
    }

    function handleEnd(this: any, event: MouseEvent | TouchEvent) {
      if (!suportTouch) {
        document.removeEventListener(eventType.MOVE, handleMove)
        document.removeEventListener(eventType.END, handleEnd)
      }

      endHandlerRef.current.apply(this, [event])
    }

    const el = viewRef.current
    if (el) {
      el.addEventListener(eventType.START, handleStart)
      if (suportTouch) {
        el.addEventListener(eventType.MOVE, handleMove)
        el.addEventListener(eventType.END, handleEnd)
        el.addEventListener(eventType.CANCEL, handleEnd)
      }
    }
    return () => {
      const el = viewRef.current
      if (el) {
        el.removeEventListener(eventType.START, handleStart)
        if (suportTouch) {
          el.removeEventListener(eventType.MOVE, handleMove)
          el.removeEventListener(eventType.END, handleEnd)
          el.removeEventListener(eventType.CANCEL, handleEnd)
        }
      }
    }
  }, [])
}

export default useTouchEvent
