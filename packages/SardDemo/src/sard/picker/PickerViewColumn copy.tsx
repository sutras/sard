import {
  Children,
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useEvent } from '../use'
import { isNullish, minmax } from '../utils'
import Halfline from '../halfline'
import { usePan } from '../pan-gesture-detector/usePan'
import PanGestureDetector from '../pan-gesture-detector'
import { createInertialMotion } from './InertialMotion'

export interface PickerViewColumnProps {
  children?: ReactElement | ReactElement[]
  indicatorHeight?: number
  value?: number
  onChange?: (value: number) => void
  immediateChange?: boolean
}

export const PickerViewColumn = (props: PickerViewColumnProps) => {
  const { children, indicatorHeight = 48, value, onChange } = props

  const [bem] = useBem('picker')

  const columns = Children.toArray(children)
  const itemCount = columns.length

  const groupRef = useRef<HTMLDivElement>(null)

  const currentIndex = useRef<number>()

  const setTranslate = useEvent((value: number) => {
    if (groupRef.current) {
      groupRef.current.style.transform = `translateY(${value}px) translateZ(0px)`
    }
  })

  const setDuration = (duration: number) => {
    if (groupRef.current) {
      groupRef.current.style.transitionDuration = `${duration}ms`
    }
  }

  const setBezier = (bezier: string) => {
    if (groupRef.current) {
      groupRef.current.style.transitionTimingFunction = bezier
    }
  }

  const setIndex = useEvent(
    (index: number, emitChange = false, animated = false) => {
      index = minmax(index, 0, itemCount - 1)
      if (index === currentIndex.current) {
        return false
      }

      const to = -index * indicatorHeight
      currentIndex.current = index
      motion.setCurrentOffsetY(to)
      setDuration(animated ? 300 : 0)
      setTranslate(to)

      if (emitChange) {
        onChange?.(index)
      }
    },
  )

  const handleStop = useEvent(() => {
    setDuration(0)
    if (groupRef.current) {
      const offsetY = +window
        .getComputedStyle(groupRef.current)
        .getPropertyValue('transform')
        .split(')')[0]
        .split(', ')[5]
      setTranslate(offsetY)
      motion.setCurrentOffsetY(offsetY)
    }
  })

  const handleReset = useEvent(
    (offsetY: number, duration: number, bezier: string) => {
      setTranslate(offsetY)
      setDuration(duration)
      setBezier(bezier)
    },
  )

  const handleMotionEnd = useEvent((offsetY: number) => {
    const index = Math.round(Math.abs(offsetY) / indicatorHeight)
    const correctOffsetY = -index * indicatorHeight

    if (correctOffsetY !== offsetY) {
      setDuration(300)
      setTranslate(correctOffsetY)
      motion.setCurrentOffsetY(correctOffsetY)
    }

    if (currentIndex.current !== index) {
      currentIndex.current = index
      onChange?.(index)
    }
  })

  const beforeMonmentum = useEvent((offsetY: number) => {
    // inside
    if (offsetY < 0 && offsetY > -(itemCount - 1) * indicatorHeight) {
      const index = Math.round(Math.abs(offsetY) / indicatorHeight)
      const correctOffsetY = -index * indicatorHeight

      if (currentIndex.current !== index) {
        currentIndex.current = index
        onChange?.(index)
      }

      return correctOffsetY
    }

    // outside
    const index = offsetY > 0 ? 0 : itemCount - 1
    if (currentIndex.current !== index) {
      currentIndex.current = index
      onChange?.(index)
    }

    return offsetY
  })

  const handleMomentum = useEvent(
    (offsetY: number, duration: number, bezier: string) => {
      setTranslate(offsetY)
      setDuration(duration)
      setBezier(bezier)
    },
  )

  const motion = useMemo(() => {
    return createInertialMotion({
      scrollHeight: indicatorHeight,
      contentHeight: indicatorHeight * itemCount,
      maxOverflowY: 0,
      onStop: handleStop,
      onMove: (offsetY) => {
        setTranslate(offsetY)
      },
      onOutsideEnd: handleMotionEnd,
      onInsideEnd: handleMotionEnd,
      beforeMonmentum: beforeMonmentum,
      onMomentum: handleMomentum,
      onReset: handleReset,
    })
  }, [])

  useMemo(() => {
    motion.setSize(indicatorHeight, indicatorHeight * itemCount)
  }, [indicatorHeight, itemCount])

  const handlers = usePan({
    start(event) {
      motion.onStart(event.y0)
    },
    move(event) {
      motion.onMove(event.moveY)
    },
    end: motion.onEnd,
  })

  const handleItemClick = (index: number) => {
    setIndex(index, true, true)
  }

  useEffect(() => {
    if (!isNullish(value)) {
      setIndex(value, false, false)
    }
  }, [value])

  useEffect(() => motion.destroy, [])

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
