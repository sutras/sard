import {
  FC,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  animate,
  getTransformOrigin,
  minmax,
  getDampingValue,
  transitionEnd,
} from '../../utils'
import {
  DOUBLE_TAP,
  PINCH_START,
  PINCH_MOVE,
  PINCH_END,
  StrikePinchEvent,
  StrikeTapEvent,
} from '../../strike'
import { useEvent, useResize, useStrike } from '../../use'
import { SwiperItem } from '../swiper'
import { useMovable, UseMovableOptions } from '../movable'
import { PubSub } from '../../utils/createPubSub'

export interface ImagePreviewItemProps {
  url: string
  doubletapScale?: number
  minScale?: number
  maxScale?: number
  swiperProcessing: boolean
  visible: boolean
  pubSub: MutableRefObject<PubSub>
}

enum CodeDirMap {
  'none',
  'horizontal',
  'vertical',
  'all',
}

export const ImagePreviewItem: FC<ImagePreviewItemProps> = (props) => {
  const {
    url,
    doubletapScale = 2,
    minScale = 1,
    maxScale = 7,
    swiperProcessing,
    visible,
    pubSub,
  } = props

  const [animating, setAnimating] = useState(false)
  const [zooming, setZooming] = useState(false)
  const [pinching, setPinching] = useState(false)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const currentScale = useRef(1)
  const scale = useRef(1)

  const wrapRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLElement>(null)

  const stopDoubleTapScaleAnimate = useRef<(...args: any[]) => any>()

  const setTransform = (clear?: boolean) => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = clear
        ? ''
        : `translate3d(${currentX.current}px, ${currentY.current}px, 0) scale(${currentScale.current})`
    }
  }

  const setTransitionDuration = (duration: number) => {
    if (wrapRef.current) {
      wrapRef.current.style.transitionDuration = duration + 'ms'
    }
  }

  const setImgSize = () => {
    if (imgRef.current) {
      imgRef.current.style.width = containWidth * scale.current + 'px'
      imgRef.current.style.height = containHeight * scale.current + 'px'
    }
  }

  const [direction, setDirection] =
    useState<UseMovableOptions['direction']>('all')

  const [viewportSize, setViewportSize] = useState(() => [
    window.innerWidth,
    window.innerHeight,
  ])
  useResize(() => {
    setViewportSize([window.innerWidth, window.innerHeight])
  }, 150)

  const [naturalSize, setNaturalSize] = useState([0, 0])
  const handleLoad = (event: any) => {
    setNaturalSize([event.target.naturalWidth, event.target.naturalHeight])
  }

  const [containWidth, containHeight] = useMemo(() => {
    const aspectRatio = naturalSize[0] / naturalSize[1] || 0
    const wider = aspectRatio > viewportSize[0] / viewportSize[1]
    const width = wider ? viewportSize[0] : aspectRatio * viewportSize[1]
    const height = !wider ? viewportSize[1] : viewportSize[0] / aspectRatio
    return [width, height]
  }, [naturalSize, viewportSize])

  const getContainPosition = (): [number, number, 'none'] => {
    return [
      (viewportSize[0] - containWidth) / 2,
      (viewportSize[1] - containHeight) / 2,
      'none',
    ]
  }

  const updateTranslate = () => {
    if (scale.current === 1) {
      setContainPosition()
    }
  }

  const setContainPosition = () => {
    const [x, y] = getContainPosition()
    currentX.current = x
    currentY.current = y
    setTransform()
  }

  useMemo(() => {
    if (wrapRef.current) {
      updateTranslate()
      setImgSize()
    }
  }, [wrapRef, naturalSize, viewportSize])

  const getNextPosition = (
    relativeScale: number,
    prevOffsetX: number,
    prevOffsetY: number,
    prevAbsoluteScale: number,
    prevX: number,
    prevY: number,
    correct = true,
  ): [number, number, UseMovableOptions['direction']] => {
    let nextX = 0
    let nextY = 0

    nextX = prevX + prevOffsetX - prevOffsetX * relativeScale
    nextY = prevY + prevOffsetY - prevOffsetY * relativeScale

    const nextWidth = relativeScale * (containWidth * prevAbsoluteScale)
    const nextHeight = relativeScale * (containHeight * prevAbsoluteScale)
    if (correct && nextWidth <= viewportSize[0]) {
      nextX = (viewportSize[0] - nextWidth) / 2
    } else {
      nextX = minmax(nextX, viewportSize[0] - nextWidth, 0)
    }
    if (correct && nextHeight <= viewportSize[1]) {
      nextY = (viewportSize[1] - nextHeight) / 2
    } else {
      nextY = minmax(nextY, viewportSize[1] - nextHeight, 0)
    }

    const dir = CodeDirMap[
      (nextWidth <= viewportSize[0] ? 0 : 1) +
        (nextHeight <= viewportSize[1] ? 0 : 2)
    ] as UseMovableOptions['direction']

    return [nextX, nextY, dir]
  }

  const handleDoubleTap = useEvent((event: StrikeTapEvent) => {
    pubSub.current.emit('subprocess', true)
    setAnimating(true)

    const nextScale = scale.current === 1 ? doubletapScale : 1 / scale.current
    const isRestored = scale.current !== 1

    const offsetX = event.x - currentX.current
    const offsetY = event.y - currentY.current

    const [nextX, nextY, dir] = isRestored
      ? getContainPosition()
      : getNextPosition(
          nextScale,
          offsetX,
          offsetY,
          scale.current,
          currentX.current,
          currentY.current,
        )

    currentX.current = nextX
    currentY.current = nextY
    currentScale.current = nextScale

    setTransitionDuration(300)

    setTransform()

    setDirection(dir)

    stopDoubleTapScaleAnimate.current = transitionEnd(() => {
      setTransitionDuration(0)

      currentScale.current = 1
      scale.current = isRestored ? 1 : nextScale

      updateViewRect({
        width: containWidth * scale.current,
        height: containHeight * scale.current,
      })

      setTransform()

      setImgSize()

      setCoord(currentX.current, currentY.current)

      if (isRestored) {
        pubSub.current.emit('subprocess', false)
      }

      setZooming(!isRestored)
      setAnimating(false)
    }, 300).clear
  })

  // useStrike(
  //   wrapRef,
  //   (strike) => {
  //     strike.on(DOUBLE_TAP, handleDoubleTap)
  //   },
  //   {
  //     tap: true,
  //     init: !swiperProcessing && !animating && !pinching,
  //   },
  // )

  const { updateViewRect, setCoord } = useMovable(
    wrapRef,
    {
      x: 0,
      y: 0,
      width: viewportSize[0],
      height: viewportSize[1],
    },
    {
      inertia: true,
      outOfBounds: true,
      scale: true,
      // touchable: !swiperProcessing && !animating && zooming && !pinching,
      direction,
      onChange(x, y) {
        currentX.current = x
        currentY.current = y
        setTransform()
      },
    },
  )

  // const handlePinchEnd = useEvent((event: StrikePinchEvent) => {
  //   const handleFinish = () => {
  //     currentScale.current = 1

  //     const [nextX, nextY, dir] = getNextPosition(
  //       immediatePreviewScale.current,
  //       offsetX,
  //       offsetY,
  //       prevScale,
  //       prevX,
  //       prevY,
  //     )
  //     currentX.current = nextX
  //     currentY.current = nextY
  //     scale.current = nextScale
  //     setDirection(dir)

  //     if (nextScale === 1) {
  //       setContainPosition()
  //       setZooming(false)
  //       pubSub.current.emit('subprocess', false)
  //     }
  //     if (nextScale > 1) {
  //       setZooming(true)
  //     }

  //     wrapRef.current.style.transformOrigin = ''
  //   }
  // })

  useEffect(() => {
    if (!visible) {
      stopDoubleTapScaleAnimate.current?.()
      setAnimating(false)
      // pubSub.current.emit('subprocess', false)
      setContainPosition()
    }
  }, [visible])

  useEffect(
    () => () => {
      stopDoubleTapScaleAnimate.current?.()
    },
    [],
  )

  useEffect(() => {
    // pubSub.current.on('swipestart', () => {
    //   pinchStrike.unbind()
    // })
    // pubSub.current.on('swipeend', () => {
    //   pinchStrike.bind()
    // })
    // pubSub.current.on('animatestart', () => {
    //   pinchStrike.unbind()
    // })
    // pubSub.current.on('animateend', () => {
    //   pinchStrike.bind()
    // })
  }, [])

  return (
    <SwiperItem className="s-image-preview-item">
      <div className="s-image-preview-wrap" ref={wrapRef as any}>
        <img
          className="s-image-preview-img"
          ref={imgRef as any}
          src={url}
          onLoad={handleLoad}
        />
      </div>
    </SwiperItem>
  )
}

export default ImagePreviewItem
