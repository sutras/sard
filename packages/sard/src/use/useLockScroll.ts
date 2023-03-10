import { RefObject, useEffect, useRef } from 'react'
import { getAxisByTwoPoints } from '../strike/utils'
import { getScrollParent, preventDefault } from '../utils/dom'
import useEvent from './useEvent'

let lockCount = 0

const getStatus = (el: HTMLElement) => {
  const { scrollHeight, offsetHeight, scrollTop } = el
  return scrollTop <= 0 ? 1 : scrollTop + offsetHeight >= scrollHeight ? 2 : 0
}

export function useLockScroll(
  rootRef: RefObject<HTMLElement>,
  className: string,
) {
  const locked = useRef(false)
  const startStatus = useRef(0)
  const scrollBox = useRef<HTMLElement>()
  const maxScroll = useRef(0)
  const contained = useRef(false)
  const startCoord = useRef({ x: 0, y: 0 })
  const isHorizontal = useRef(false)

  const handleTouchStart = useEvent((event: TouchEvent) => {
    const touch = event.touches[0]

    startCoord.current = {
      x: touch.clientX,
      y: touch.clientY,
    }

    contained.current = rootRef.current.contains(event.target as Node)

    if (!contained.current) {
      return
    }

    scrollBox.current = getScrollParent(
      event.target as HTMLElement,
      rootRef.current,
    )

    maxScroll.current =
      scrollBox.current.scrollHeight - scrollBox.current.offsetHeight
    if (maxScroll.current <= 0) {
      return
    }

    startStatus.current = getStatus(scrollBox.current)
  })

  const handleTouchMove = useEvent((event: TouchEvent) => {
    if (isHorizontal.current) {
      return
    }

    const touch = event.touches[0]

    const axis = getAxisByTwoPoints(
      startCoord.current.x,
      startCoord.current.y,
      touch.clientX,
      touch.clientY,
    )

    if (axis === 'horizontal') {
      isHorizontal.current = true
      return
    }

    if (!contained.current || maxScroll.current <= 0) {
      preventDefault(event)
      return
    }

    const offsetY = event.touches[0].clientY - startCoord.current.y

    if (startStatus.current === 1 && offsetY > 0) {
      preventDefault(event)
      return
    }

    if (startStatus.current === 2 && offsetY < 0) {
      preventDefault(event)
      return
    }
  })

  const handleTouchEnd = useEvent(() => {
    isHorizontal.current = false
  })

  const lock = () => {
    if (!locked.current && rootRef.current) {
      locked.current = true
      ++lockCount
      document.body.classList.add(className)
      document.addEventListener('touchstart', handleTouchStart)
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
      document.addEventListener('touchend', handleTouchEnd)
      document.addEventListener('touchcancel', handleTouchEnd)
    }
  }

  const unlock = () => {
    if (locked.current) {
      locked.current = false
      if (--lockCount === 0) {
        document.body.classList.remove(className)
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
        document.removeEventListener('touchcancel', handleTouchEnd)
      }
    }
  }

  useEffect(() => unlock, [])

  return {
    lock,
    unlock,
  }
}

export default useLockScroll
