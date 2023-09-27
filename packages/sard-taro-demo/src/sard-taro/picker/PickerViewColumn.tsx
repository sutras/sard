import { Children, ReactElement, cloneElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useEvent } from '../use'
import {
  AnimateStop,
  Direction,
  animate,
  easeOutCubic,
  easeOutQuad,
  getDirectionByTwoPoints,
  getDistanceByTowPoints,
  getRectDampingValue,
  isNullish,
  minmax,
} from '../utils'
import Halfline from '../halfline'
import { PanEvent, usePan } from '../pan-gesture-detector/usePan'
import PanGestureDetector from '../pan-gesture-detector'

export interface PickerViewColumnProps {
  children?: ReactElement | ReactElement[]
  indicatorHeight?: number
  value?: number
  onChange?: (value: number) => void
  immediateChange?: boolean
}

// 回弹运动强度判断阈值，不超出边界无回弹，超出此值为强回弹，否则为弱回弹
const bounceThreshold = 300
// 阻尼系数
const damping = 2
// 回正运动时间
const correctDuration = 300
// 惯性运动时间，会与速度相乘得到运动距离
const inertiaTime = 250
// 允许超出边界的item数量
const maxOverflowCount = 2
// 触发平移的最小距离
const panMinDistance = 5
// 触发平移滑动的速度 px/ms
const panSwipeMinSpeed = 0.3

// 不同回弹强度对应的运动时间
const mapBounceDuration = {
  noBounce: 1000,
  weekBounce: 650,
  strongBounce: 500,
}

// 不同回弹强度对应的缓动公式
const mapBounceEase = {
  noBounce: easeOutCubic,
  weekBounce: easeOutQuad,
  strongBounce: easeOutQuad,
}

// 不同回弹强度允许越出边界的距离（相对于item高度）
const mapBounceInertiaOverflowExtra = {
  noBounce: 0,
  weekBounce: 0.5,
  strongBounce: 1,
}

export const PickerViewColumn = (props: PickerViewColumnProps) => {
  const {
    children,
    indicatorHeight = 48,
    value,
    onChange,
    immediateChange,
  } = props

  const [bem] = useBem('picker')

  const columns = Children.toArray(children)
  const itemCount = columns.length

  const isMoving = useRef(false)
  const translate = useRef(0)
  const downTranslate = useRef(0)
  const stopInertia = useRef<AnimateStop>()
  const stopCorrect = useRef<AnimateStop>()
  const groupRef = useRef<HTMLDivElement>(null)

  const currentIndex = useRef<number>()

  const setTranslate = (value: number) => {
    translate.current = value
    if (groupRef.current) {
      groupRef.current.style.transform = `translate3d(0, ${value}px, 0)`
    }
  }

  const changedAtLeastOnce = useRef(false)

  const complete = (index: number, emitChange) => {
    if (currentIndex.current !== index) {
      currentIndex.current = index
      if (emitChange) {
        changedAtLeastOnce.current = true
        onChange?.(index)
      }
    }
  }

  const toCorrectPosition = (
    to: number,
    animated = true,
    emitChange = true,
  ) => {
    if (immediateChange) {
      complete(Math.abs(to / indicatorHeight), emitChange)
    }

    stopCorrect.current = animate({
      from: translate.current,
      to,
      duration: animated ? correctDuration : 0,
      step(value) {
        setTranslate(value)
      },
      finish(value) {
        if (immediateChange) {
          return
        }
        complete(Math.abs(value / indicatorHeight), emitChange)
      },
    })
  }

  const getCurrentDampedVaule = (value: number, division = false) => {
    return getRectDampingValue(
      value,
      indicatorHeight,
      indicatorHeight * itemCount,
      division ? 1 / damping || 0 : damping,
    )
  }

  const setIndex = useEvent(
    (index: number, emitChange = false, animated = false) => {
      index = minmax(index, 0, columns.length - 1)
      if (index === currentIndex.current) {
        return false
      }
      stopInertia.current?.()
      stopCorrect.current?.()
      const to = -index * indicatorHeight

      toCorrectPosition(to, animated, emitChange)
      return true
    },
  )

  const handleTouchStart = useEvent(() => {
    stopInertia.current?.()
    stopCorrect.current?.()
    downTranslate.current = getCurrentDampedVaule(translate.current)
  })

  const moveCoordQueue = useRef<{ x: number; y: number; time: number }[]>([])

  const handleTouchMove = useEvent((event: PanEvent) => {
    moveCoordQueue.current.push({
      x: event.moveX,
      y: event.moveY,
      time: Date.now(),
    })
    if (moveCoordQueue.current.length > 2) {
      moveCoordQueue.current = moveCoordQueue.current.slice(-2)
    }

    isMoving.current = true

    setTranslate(getCurrentDampedVaule(downTranslate.current + event.dy, true))
  })

  const swipeInfo = useRef<{
    direction?: Direction
    speed: number
  }>({
    direction: undefined,
    speed: 0,
  })

  const isPanSwipe = () => {
    const points = moveCoordQueue.current
    moveCoordQueue.current = []

    if (points.length === 2) {
      const [point1, point2] = points
      const distance = getDistanceByTowPoints(point1, point2)
      if (distance > panMinDistance) {
        const speed = distance / (point2.time - point1.time)
        if (speed >= panSwipeMinSpeed) {
          const direction = getDirectionByTwoPoints(point1, point2)
          swipeInfo.current = {
            speed,
            direction,
          }
          return true
        }
      }
    }
  }

  const handlePanSwipe = () => {
    const endEdge = (1 - itemCount) * indicatorHeight
    const isOverflow = translate.current > 0 || translate.current < endEdge

    if (isOverflow) {
      return
    }

    const direction = swipeInfo.current.direction === 'up' ? -1 : 1

    let to =
      translate.current + direction * (swipeInfo.current.speed * inertiaTime)
    to = Math.round(to / indicatorHeight) * indicatorHeight

    let type = 'noBounce'
    if (to > bounceThreshold || to < endEdge - bounceThreshold) {
      type = 'strongBounce'
    } else if (to > 0 || to < endEdge) {
      type = 'weekBounce'
    }

    const maxOverflow = maxOverflowCount * indicatorHeight
    to = minmax(to, endEdge - maxOverflow, maxOverflow)

    if (immediateChange) {
      complete(Math.abs(minmax(to, endEdge, 0) / indicatorHeight), true)
    }

    stopInertia.current = animate({
      from: translate.current,
      to,
      duration: mapBounceDuration[type],
      easing: mapBounceEase[type],
      step(value) {
        const extra = mapBounceInertiaOverflowExtra[type]
        const withinTranslate = minmax(
          value,
          (1 - itemCount - extra) * indicatorHeight,
          extra * indicatorHeight,
        )

        if (value !== withinTranslate) {
          stopInertia.current?.()
          toCorrectPosition(
            withinTranslate >= 0 ? 0 : endEdge,
            true,
            !immediateChange,
          )
        } else {
          setTranslate(value)
        }
      },
      finish(value) {
        if (value > 0 || value < endEdge) {
          toCorrectPosition(value > 0 ? 0 : endEdge, true, !immediateChange)
        } else {
          complete(Math.abs(value / indicatorHeight), !immediateChange)
        }
      },
    })
  }

  const handleTouchEnd = useEvent(() => {
    if (isMoving.current) {
      setTimeout(() => {
        isMoving.current = false
      }, 0)
    }

    const endEdge = (1 - itemCount) * indicatorHeight
    const isOverflow = translate.current > 0 || translate.current < endEdge

    if (isPanSwipe() && !isOverflow) {
      handlePanSwipe()
      return
    }

    toCorrectPosition(
      Math.round(minmax(translate.current, endEdge, 0) / indicatorHeight) *
        indicatorHeight,
    )
  })

  const handlers = usePan({
    start: handleTouchStart,
    move: handleTouchMove,
    end: handleTouchEnd,
  })

  const handleItemClick = (index: number) => {
    if (isMoving.current) {
      return
    }
    setIndex(index, true, true)
  }

  useEffect(() => {
    if (!isNullish(value)) {
      setIndex(value, false, false)
    }
  }, [value])

  useEffect(() => {
    return () => {
      stopInertia.current?.()
      stopCorrect.current?.()
    }
  }, [])

  return (
    <PanGestureDetector handlers={handlers}>
      <View className={bem.e('column')}>
        <View className={classNames(bem.e('mask'), bem.em('mask', 'top'))} />
        <View
          className={bem.e('indicator')}
          style={{ height: indicatorHeight + 'px' }}
        >
          <View className={bem.e('item-group')} ref={groupRef}>
            {Children.map(children, (element: ReactElement, i) => {
              return cloneElement(element, {
                onClick: () => handleItemClick(i),
              })
            })}
          </View>
          <Halfline direction="top" />
          <Halfline direction="bottom" />
        </View>
        <View className={classNames(bem.e('mask'), bem.em('mask', 'bottom'))} />
      </View>
    </PanGestureDetector>
  )
}
