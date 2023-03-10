import {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
} from 'react'
import classNames from 'classnames'
import { minmax } from '../../utils'
import { DOUBLE_TAP } from '../../strike'
import { useEvent, useInertRef, useResize, useStrike } from '../../use'
import { SwiperItem } from '../swiper'
import { getDistanceByTowPoints } from '../../strike/utils'

export interface ImagePreviewItemProps {
  url: string
  doubletapScale?: number
  minScale?: number
  maxScale?: number
  swiping: MutableRefObject<boolean>
  visible: boolean
  activeIndex: number
}

export const ImagePreviewItem: FC<ImagePreviewItemProps> = (props) => {
  const {
    url,
    doubletapScale = 2,
    minScale = 1,
    maxScale = 3,
    swiping,
    visible,
    activeIndex,
  } = props

  const moveX = useRef(0)
  const moveY = useRef(0)
  const startMoveX = useRef(0)
  const startMoveY = useRef(0)
  const scale = useRef(1)
  const startScale = useRef(1)
  const startDistance = useRef(10)
  const isMouseDown = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const deltaX = useRef(0)
  const deltaY = useRef(0)
  const zooming = useRef(false)
  const moving = useRef(false)
  const isMoving = useRef(false)

  const naturalWidth = useRef(0)
  const naturalHeight = useRef(0)
  const viewportWidth = useInertRef(() => window.innerWidth)
  const viewportHeight = useInertRef(() => window.innerHeight)
  const maxMoveX = useRef(0)
  const maxMoveY = useRef(0)

  const [isVertical, setIsVertical] = useState(false)

  const wrapRef = useRef<HTMLElement>(null)
  const swiperItemRef = useRef<HTMLDivElement>(null)

  const setTransform = () => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${moveX.current}px, ${moveY.current}px, 0) scale(${scale.current})`
    }
  }

  const resetTransform = () => {
    moveX.current = 0
    moveY.current = 0
    scale.current = 1
    setTransform()
  }

  const setTransitionDuration = (duration: number) => {
    if (wrapRef.current) {
      wrapRef.current.style.transitionDuration = duration + 'ms'
    }
  }

  const updateMaxMoveBoundary = () => {
    const isVertical =
      naturalWidth.current / naturalHeight.current <
      viewportWidth.current / viewportHeight.current

    setIsVertical(isVertical)

    const displayWidth = isVertical
      ? (naturalWidth.current / naturalHeight.current) * viewportHeight.current
      : viewportWidth.current

    maxMoveX.current = Math.max(
      0,
      (scale.current * displayWidth - viewportWidth.current) / 2,
    )

    const displayHeight = !isVertical
      ? (naturalHeight.current / naturalWidth.current) * viewportWidth.current
      : viewportHeight.current

    maxMoveY.current = Math.max(
      0,
      (scale.current * displayHeight - viewportHeight.current) / 2,
    )
  }

  const handleTouchStart = (event: MouseEvent | TouchEvent) => {
    if (swiping.current) {
      return
    }

    const isTouch = 'touches' in event

    if ('ontouchstart' in window && !isTouch) {
      return
    }

    if (!isTouch) {
      isMouseDown.current = true
    }

    const touches = isTouch ? event.touches : [event]

    startX.current = touches[0].clientX
    startY.current = touches[0].clientY
    startMoveX.current = moveX.current
    startMoveY.current = moveY.current
    moving.current = touches.length === 1 && scale.current !== 1

    isMoving.current = false

    zooming.current = touches.length === 2

    if (zooming.current) {
      startScale.current = scale.current
      startDistance.current = getDistanceByTowPoints(
        touches[0].clientX,
        touches[0].clientY,
        touches[1].clientX,
        touches[1].clientY,
      )
    }

    if (zooming.current || moving.current) {
      setTransitionDuration(0)
    }
  }

  const handleTouchMove = (event: MouseEvent | TouchEvent) => {
    if (swiping.current) {
      return
    }

    const isTouch = 'touches' in event

    if ('ontouchstart' in window && !isTouch) {
      return
    }

    if (!isTouch && !isMouseDown.current) {
      return
    }

    if (!isTouch) {
      event.preventDefault()
    }

    const touches = isTouch ? event.touches : [event]

    if (touches.length > 1) {
      event.stopPropagation()
    }

    if (zooming.current) {
      event.stopPropagation()

      if (touches.length === 2) {
        const distance = getDistanceByTowPoints(
          touches[0].clientX,
          touches[0].clientY,
          touches[1].clientX,
          touches[1].clientY,
        )
        const nextScale =
          (distance / startDistance.current) * startScale.current
        scale.current = minmax(nextScale, minScale / 2, maxScale + 1)
        updateMaxMoveBoundary()
      }
    }

    if (moving.current) {
      deltaX.current = touches[0].clientX - startX.current
      deltaY.current = touches[0].clientY - startY.current
      const nextMoveX = deltaX.current + startMoveX.current
      const nextMoveY = deltaY.current + startMoveY.current

      if (
        !isMoving.current &&
        (nextMoveX > maxMoveX.current || nextMoveX < -maxMoveX.current)
      ) {
        moving.current = false
        return
      }
      event.stopPropagation()

      isMoving.current = true

      moveX.current = minmax(nextMoveX, -maxMoveX.current, maxMoveX.current)
      moveY.current = minmax(nextMoveY, -maxMoveY.current, maxMoveY.current)
    }

    setTransform()
  }

  const handleTouchEnd = (event: MouseEvent | TouchEvent) => {
    if (swiping.current) {
      if (scale.current !== 1) {
        setTransitionDuration(300)
      }
      return
    }

    const isTouch = 'touches' in event

    if ('ontouchstart' in window && !isTouch) {
      return
    }

    if (!isTouch) {
      isMouseDown.current = false
    }

    const touches = isTouch ? event.touches : [event]

    if (zooming.current || moving.current) {
      if (touches.length === 0) {
        moving.current = false

        if (zooming.current) {
          scale.current = minmax(scale.current, minScale, maxScale)
          updateMaxMoveBoundary()

          moveX.current = minmax(
            moveX.current,
            -maxMoveX.current,
            maxMoveX.current,
          )
          moveY.current = minmax(
            moveY.current,
            -maxMoveY.current,
            maxMoveY.current,
          )

          setTransform()

          zooming.current = false
        }

        setTransitionDuration(300)
      }
    }
  }

  const handleDoubleTap = useEvent(() => {
    if (swiping.current) {
      return
    }

    if (scale.current === 1) {
      scale.current = doubletapScale
    } else {
      scale.current = 1
    }
    updateMaxMoveBoundary()

    moveX.current = 0
    moveY.current = 0

    setTransitionDuration(300)

    setTransform()
  })

  useStrike(
    swiperItemRef,
    (strike) => {
      strike.on(DOUBLE_TAP, handleDoubleTap)
    },
    {
      tap: true,
    },
  )

  const handleLoad = (event: any) => {
    naturalWidth.current = event.target.naturalWidth
    naturalHeight.current = event.target.naturalHeight
    updateMaxMoveBoundary()
  }

  useResize(() => {
    viewportWidth.current = window.innerWidth
    viewportHeight.current = window.innerHeight
    updateMaxMoveBoundary()
  }, 150)

  useEffect(() => {
    if (!visible) {
      resetTransform()
    }
  }, [visible])

  useEffect(() => {
    resetTransform()
  }, [activeIndex])

  return (
    <SwiperItem
      className="s-image-preview-item"
      ref={swiperItemRef}
      onTouchStart={handleTouchStart}
      onTouchMoveCapture={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      <div
        className={classNames('s-image-preview-wrap', {
          's-image-preview-wrap-vertical': isVertical,
        })}
        ref={wrapRef as any}
      >
        <img className="s-image-preview-img" src={url} onLoad={handleLoad} />
      </div>
    </SwiperItem>
  )
}

export default ImagePreviewItem
