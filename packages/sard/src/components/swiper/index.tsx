import {
  CSSProperties,
  ReactNode,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  useEffect,
  useState,
  Children,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { animate, getRectDampingValue } from '../../utils'
import {
  PAN_END,
  PAN_SWIPE_LEFT,
  PAN_SWIPE_RIGHT,
  PAN_SWIPE_UP,
  PAN_SWIPE_DOWN,
  PAN_MOVE,
  PAN_START,
  StrikePanEvent,
} from '../../strike'

import { useStrike, useAutoplay, useEvent } from '../../use'

import { SwiperItem } from './Item'
import { SwiperDot } from './Dot'

export * from './Item'
export * from './Dot'

const DELTA_Y = 'deltaY'
const DELTA_X = 'deltaX'
const CLIENT_HEIGHT = 'clientHeight'
const CLIENT_WIDTH = 'clientWidth'

const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'

export interface SwiperProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  defaultIndex?: number
  autoplay?: boolean
  interval?: number
  duration?: number
  circular?: boolean
  vertical?: boolean
  easing?: string
  damping?: number
  showDots?: boolean
  // 自定义指示器
  dots?: (size: number, activeIndex: number) => ReactNode
  dotColor?: string
  dotActiveColor?: string
  dotClickable?: boolean
  onChange?: (index: number) => void
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
  onAnimateStart?: () => void
  onAnimateEnd?: () => void
  onTouchStart?: (event: StrikePanEvent) => void
  onTouchMove?: (event: StrikePanEvent) => void
  onTouchEnd?: (event: StrikePanEvent) => void
  touchable?: boolean
}

export interface SwiperRef {
  swipeTo(index: number, animated?: boolean): void
  prev(animated?: boolean): void
  next(animated?: boolean): void
}

export interface SwiperFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<SwiperProps> & RefAttributes<SwiperRef>
  > {
  Item: typeof SwiperItem
}

export const Swiper: SwiperFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    defaultIndex = 0,
    autoplay = false,
    interval = 1500,
    duration = 400,
    circular = false,
    vertical = false,
    easing = 'ease-out',
    damping = 3,
    showDots = false,
    dots,
    dotColor,
    dotActiveColor,
    dotClickable = false,
    onChange,
    onAnimateStart,
    onAnimateEnd,
    onTransitionStart,
    onTransitionEnd,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    touchable = true,
    ...restProps
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const stopSlide = useRef<(...args: any[]) => any | null>(null)
  const translate = useRef(0)
  const itemList = useRef<HTMLElement[]>([])
  const animateFinish = useRef(true)

  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const wrapperStyle = {
    transitionTimingFunction: easing,
  }

  const swiperClass = classNames(
    's-swiper',
    {
      's-swiper-vertical': vertical,
      's-swiper-touchable': touchable,
    },
    className,
  )

  const itemCount = Children.count(children)

  const setTranslate = (el: HTMLElement, value: number) => {
    el.style.transform = `translate${vertical ? 'Y' : 'X'}(${
      value * 100
    }%) translateZ(0)`
  }

  const setWrapperTranslate = (value: number) => {
    translate.current = value
    if (wrapperRef.current) {
      setTranslate(wrapperRef.current, value)
    }
  }

  const stopAnimate = () => {
    if (stopSlide.current) {
      stopSlide.current?.()
      stopSlide.current = null
      onAnimateEnd?.()
    }
  }

  const startAnimate = (to: number, duration: number) => {
    stopAnimate()
    animateFinish.current = false
    onAnimateStart?.()
    stopSlide.current = animate({
      from: translate.current,
      to,
      duration,
      step(value) {
        if (circular) {
          updateItemsTranslate(value)
        }
        setWrapperTranslate(value)
      },
      finish() {
        stopSlide.current = null
        animateFinish.current = true
        onAnimateEnd?.()
      },
    })
  }

  const updateItemsTranslate = (offset: number) => {
    const items = itemList.current
    const itemCount = items.length

    if (offset < 0) {
      offset -= 0.5
      const overOffset = (-offset + 1) % itemCount
      const round = Math.floor((-offset + 1) / itemCount)
      const spanCount = Math.ceil(overOffset / 1)

      items.forEach((item, index) => {
        const currRound = index < spanCount ? round : round - 1
        setTranslate(item, itemCount * currRound)
      })
    } else {
      offset += 0.5
      const overOffset = offset % itemCount
      const round = Math.ceil(offset / itemCount)
      const spanCount = Math.ceil(overOffset / 1)

      items.forEach((item, index) => {
        const currRound = itemCount - index <= spanCount ? round : round - 1
        setTranslate(item, -itemCount * currRound)
      })
    }
  }

  const downTranslate = useRef(0)
  const wrapperSize = useRef(0)
  const containerSize = useRef(0)
  const oldCircularIndex = useRef(0)
  const moving = useRef(false)

  const handlePanStart = useEvent((event: StrikePanEvent) => {
    stopAutoPlay()
    stopAnimate()

    onTouchStart?.(event)

    const el = event.target as HTMLElement
    const wrapper = wrapperRef.current as HTMLElement
    itemList.current = Array.from(wrapper.children) as HTMLElement[]
    const wrapperRect = wrapper.getBoundingClientRect()
    const containerRect = el.getBoundingClientRect()

    const size = vertical ? 'height' : 'width'
    const clientAxis = vertical ? CLIENT_HEIGHT : CLIENT_WIDTH
    const direction = vertical ? 'top' : 'left'
    const borderSize = (containerRect[size] - el[clientAxis]) / 2

    containerSize.current = el[clientAxis]
    wrapperSize.current =
      containerSize.current * (Children.count(children) || 1)

    const offset =
      wrapperRect[direction] - containerRect[direction] - borderSize
    downTranslate.current = offset

    if (!circular) {
      downTranslate.current = getRectDampingValue(
        offset,
        containerSize.current,
        wrapperSize.current,
        damping,
      )
    }
  })

  const handlePanMove = useEvent((event: StrikePanEvent) => {
    onTouchMove?.(event)

    moving.current = true
    let offset = downTranslate.current + event[vertical ? DELTA_Y : DELTA_X]

    if (circular) {
      updateItemsTranslate(offset / containerSize.current)
    } else {
      offset = getRectDampingValue(
        offset,
        containerSize.current,
        wrapperSize.current,
        1 / damping || 0,
      )
    }

    setWrapperTranslate(offset / containerSize.current)
  })

  const handlePanEnd = useEvent((event: StrikePanEvent) => {
    const type = event.type

    onTouchEnd?.(event)

    if (type === PAN_END && event.swipe) {
      return
    }

    if (!moving.current) {
      if (!animateFinish.current) {
        startAnimate(
          circular ? -oldCircularIndex.current : -activeIndex,
          duration,
        )
      }
      autoPlay()
      return
    }
    moving.current = false

    if (!event.expectedDirection) {
      return
    }

    let index = 0
    let value = 0
    const oldTranslate = translate.current
    const itemCount = Children.count(children)

    const offset = downTranslate.current + event[vertical ? DELTA_Y : DELTA_X]

    if (itemCount > 0) {
      if (circular) {
        const modOffset = offset % wrapperSize.current
        const sign = modOffset < 0 ? 1 : -1
        const spanCount = modOffset / containerSize.current
        const reverseSize = itemCount + spanCount * sign
        value = reverseSize < 0.5 ? reverseSize * sign : spanCount

        setWrapperTranslate(value)
        updateItemsTranslate(value)

        oldCircularIndex.current = index =
          -Math[
            type === PAN_END
              ? 'round'
              : type === PAN_SWIPE_RIGHT || type === PAN_SWIPE_DOWN
              ? 'ceil'
              : 'floor'
          ](value)
      } else {
        if (offset > 0) {
          index = 0
        } else {
          index = Math.abs(
            Math[
              type === PAN_END
                ? 'round'
                : type === PAN_SWIPE_RIGHT || type === PAN_SWIPE_DOWN
                ? 'ceil'
                : 'floor'
            ](offset / containerSize.current),
          )
          if (index > itemCount - 1) {
            index = itemCount - 1
          }
        }
        if (type === PAN_END && !event.expectedDirection) {
          translate.current = oldTranslate
          index = activeIndex
        }
      }
    }

    startAnimate(-index, duration)

    if (circular) {
      if (index < 0) {
        index += itemCount
      } else if (index >= itemCount) {
        index = 0
      }
    }
    setActiveIndex(index)

    autoPlay()
  })

  const containerBinding = useStrike(
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
      strike.on(PAN_SWIPE_LEFT, handlePanEnd)
      strike.on(PAN_SWIPE_RIGHT, handlePanEnd)
      strike.on(PAN_SWIPE_UP, handlePanEnd)
      strike.on(PAN_SWIPE_DOWN, handlePanEnd)
    },
    {
      pan: true,
      direction: vertical ? VERTICAL : HORIZONTAL,
      lockDirection: true,
    },
    touchable,
  )

  const setTranslateByIndex = (index: number, animated = true) => {
    const wrapper = wrapperRef.current

    if (wrapper) {
      const itemCount = Children.count(children)
      if (itemCount === 0 || index < 0) {
        index = 0
      } else if (index > itemCount - 1) {
        index = itemCount - 1
      }
      itemList.current = Array.from(wrapper.children) as HTMLElement[]
      setActiveIndex(index)
      startAnimate(-index, animated ? duration : 0)
    }
  }

  // 自动播放
  const [autoPlay, stopAutoPlay] = useAutoplay(
    () => {
      next()
    },
    interval,
    autoplay,
  )

  useEffect(() => {
    // 初始化位移
    setTranslateByIndex(activeIndex, false)

    // 卸载时停止动画
    return () => {
      stopAnimate()
    }
  }, [])

  useEffect(() => {
    onChange?.(activeIndex)
  }, [activeIndex])

  // 命令式
  const swipeTo = useEvent((index, animated = true) => {
    setTranslateByIndex(index, animated)
  })

  const prev = useEvent((animated?: boolean) => {
    let index = activeIndex
    if ((index -= 1) < 0) {
      index = Children.count(children) - 1
    }
    swipeTo(index, animated)
  })

  const next = useEvent((animated?: boolean) => {
    const maxIndex = Children.count(children) - 1
    let index = activeIndex
    if ((index += 1) > maxIndex) {
      index = 0
    }
    swipeTo(index, animated)
  })

  useImperativeHandle(ref, () => ({
    swipeTo,
    prev,
    next,
  }))

  return (
    <div {...(restProps as any)} {...containerBinding} className={swiperClass}>
      <div ref={wrapperRef} className="s-swiper-wrapper" style={wrapperStyle}>
        {children}
      </div>
      {itemCount !== 0 &&
        showDots &&
        ((dots && dots(itemCount, activeIndex)) || (
          <SwiperDot
            size={itemCount}
            activeIndex={activeIndex}
            color={dotColor}
            activeColor={dotActiveColor}
            clickable={dotClickable}
            onClick={(index) => dotClickable && swipeTo(index)}
          ></SwiperDot>
        ))}
    </div>
  )
}) as SwiperFC

Swiper.Item = SwiperItem

export default Swiper

/*  
        ┌─────┐
        └─────┘
  ┌─────┬─────┬─────┐
  └─────┴─────┴─────┘
  
        ╔═════╗
        ╚═════╝
  ┌─────┬─────┬─────┐
  └─────┴─────┴─────┘


  ╰────────────
  ────────────╯

 */

/* 问题
  ==============================
  [x] 不符合指定方向，在 end 时依然会切换
  [x] children 必须为数组
  [ ] 滑动未结束，再次以意料外方向滑动时，不会阻止浏览器默认行为，轮播图会停止滑动；
      想要行为：不管滑动方向为何，只要未切换完毕，都阻止浏览器默认行为（既可正常滑动）

  */

/* 无缝衔接
===============================
# offset < 0
overOffset = -offset + containerSize - wrapperSize
spanCount = Math.ceil(overOffset / containerSize)
if (index < spanCount) {
  setTranslate(item, itemCount)
}

# offset >= 0
overOffset = offset
spanCount = Math.ceil(overOffset / containerSize)
if (itemCount - index <= spanCount) {
  setTranslate(item, -itemCount)
}

*/
