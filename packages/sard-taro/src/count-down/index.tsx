import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useEvent } from '../use'
import { BaseProps } from '../base'

export interface CountDownRef {
  start: () => void
  pause: () => void
  reset: () => void
}

export interface CountDownCurrentTime {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  total: number
}

export interface CountDownProps extends Omit<BaseProps, 'children'> {
  children?: (time: CountDownCurrentTime) => ReactNode
  time?: number
  autoStart?: boolean
  format?: string
  interval?: number
  onChange?: (time: CountDownCurrentTime) => void
  onFinish?: () => void
}

function padZero(n: number, length = 2) {
  return String(n).padStart(length, '0')
}

function getCurrentTime(current) {
  return {
    milliseconds: current % 1000,
    seconds: ~~(current / 1000) % 60,
    minutes: ~~(current / 1000 / 60) % 60,
    hours: ~~(current / 1000 / 60 / 60) % 60,
    days: ~~(current / 1000 / 60 / 60 / 24),
    total: current,
  }
}

export const CountDown = forwardRef<CountDownRef, CountDownProps>(
  (props, ref) => {
    const {
      className,
      children,
      time,
      autoStart = true,
      onChange,
      onFinish,
      interval = 1000,
      format = 'HH:mm:ss',
      ...restProps
    } = props

    const [bem] = useBem('count-down')

    const [current, setCurrent] = useState(time ?? 0)
    const pausedTime = useRef(0)
    const playedTime = useRef(0)

    const currentTime = useMemo(() => getCurrentTime(current), [current])

    const timer = useRef(0)
    const paused = useRef(true)

    const tick = () => {
      const tickTime = Date.now() - playedTime.current
      const nextCurrent = Math.max(current - tickTime, 0)
      setCurrent(nextCurrent)
      onChange?.(getCurrentTime(nextCurrent))
      if (nextCurrent === 0) {
        pause()
        onFinish?.()
      }
    }

    const start = useEvent(() => {
      if (!paused.current) {
        return
      }
      timer.current = setInterval(tick, interval) as unknown as number
      paused.current = false
      playedTime.current = Date.now()
    })

    const pause = useEvent(() => {
      if (paused.current) {
        return
      }
      clearInterval(timer.current)
      paused.current = true
      pausedTime.current = Date.now()
    })

    const reset = useEvent(() => {
      pause()
      setCurrent(time ?? 0)
    })

    useImperativeHandle(ref, () => ({
      start,
      pause,
      reset,
    }))

    useEffect(() => {
      if (autoStart) {
        start()
      }

      return pause
    }, [])

    const formatTime = () => {
      return format
        .replace(/DD/g, padZero(currentTime.days))
        .replace(/HH/g, padZero(currentTime.hours))
        .replace(/mm/g, padZero(currentTime.minutes))
        .replace(/ss/g, padZero(currentTime.seconds))
        .replace(/SSS/g, padZero(currentTime.milliseconds, 3))
        .replace(/SS/g, padZero(currentTime.milliseconds, 3).slice(0, 2))
        .replace(/S/g, padZero(currentTime.milliseconds, 3).slice(0, 1))
    }

    const countDownClass = classNames(bem.b(), className)

    return (
      <View {...restProps} className={countDownClass}>
        {children ? children(currentTime) : formatTime()}
      </View>
    )
  },
)

export default CountDown
