import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useEvent, useForceRender } from '../use'
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

function getCurrentTime(remainTime) {
  return {
    milliseconds: remainTime % 1000,
    seconds: ~~(remainTime / 1000) % 60,
    minutes: ~~(remainTime / 1000 / 60) % 60,
    hours: ~~(remainTime / 1000 / 60 / 60) % 60,
    days: ~~(remainTime / 1000 / 60 / 60 / 24),
    total: remainTime,
  }
}

type CurrentTime = ReturnType<typeof getCurrentTime>

function formatTime(format: string, currentTime: CurrentTime) {
  return format
    .replace(/DD/g, padZero(currentTime.days))
    .replace(/HH/g, padZero(currentTime.hours))
    .replace(/mm/g, padZero(currentTime.minutes))
    .replace(/ss/g, padZero(currentTime.seconds))
    .replace(/s/g, String(currentTime.seconds))
    .replace(/SSS/g, padZero(currentTime.milliseconds, 3))
    .replace(/SS/g, padZero(currentTime.milliseconds, 3).slice(0, 2))
    .replace(/S/g, padZero(currentTime.milliseconds, 3).slice(0, 1))
}

export const CountDown = forwardRef<CountDownRef, CountDownProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      time = 0,
      autoStart = true,
      onChange,
      onFinish,
      interval = 1000,
      format = 'HH:mm:ss',
      ...restProps
    } = props

    const [bem] = useBem('count-down')

    const forceRender = useForceRender()

    const remainTime = useRef(time)
    const endTime = useRef(0)
    const timer = useRef<NodeJS.Timeout>()
    const paused = useRef(true)

    const intervalTime = useRef(0)

    const tickHook = (now: number) => {
      const time = Math.floor(now / interval)
      if (time !== intervalTime.current) {
        intervalTime.current = time
        onChange?.(getCurrentTime(remainTime.current))
        forceRender()
      }
    }

    const tick = () => {
      const now = Date.now()
      remainTime.current = Math.max(endTime.current - now, 0)

      tickHook(now)

      if (remainTime.current === 0) {
        pause()
        onFinish?.()
        return
      }
      timer.current = setTimeout(() => {
        tick()
      }, 16)
    }

    const start = useEvent(() => {
      if (!paused.current) {
        return
      }
      paused.current = false
      endTime.current = Date.now() + remainTime.current
      tick()
    })

    const pause = useEvent(() => {
      if (paused.current) {
        return
      }
      clearTimeout(timer.current)
      timer.current = undefined
      paused.current = true
    })

    const reset = useEvent(() => {
      pause()
      remainTime.current = time
      forceRender()
    })

    useImperativeHandle(
      ref,
      () => ({
        start,
        pause,
        reset,
      }),
      [],
    )

    useEffect(() => {
      if (autoStart) {
        start()
      }

      return pause
    }, [])

    const currentTime = useMemo(
      () => getCurrentTime(remainTime.current),
      [remainTime.current],
    )

    return (
      <View
        {...restProps}
        className={classNames(bem.b(), className)}
        style={style}
      >
        {children ? children(currentTime) : formatTime(format, currentTime)}
      </View>
    )
  },
)

export default CountDown
