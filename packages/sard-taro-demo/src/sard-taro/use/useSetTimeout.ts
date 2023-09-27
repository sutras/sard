/**
 * 使在函数组件中更好使用 setTimeout，可以重置或清除定时器
 */

import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'
import { AnyFunction } from '../base'

interface UseSetTimeoutOptions {
  canDelay?: AnyFunction
  tailing?: boolean
}

export function useSetTimeout(
  callback: AnyFunction,
  duration: number,
  options: UseSetTimeoutOptions = {},
) {
  const { canDelay = () => true, tailing } = options

  const timer = useRef(0)

  const func = useEvent(callback)
  const canDelayCallback = useEvent(canDelay)

  const cancel = useEvent(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = 0
      if (tailing) {
        func()
      }
    }
  })

  const doSomethingLater = useEvent((...args) => {
    cancel()
    if (canDelayCallback()) {
      timer.current = setTimeout(() => {
        timer.current = 0
        func(...args)
      }, duration) as unknown as number
    }
  })

  const isWaitingToDoSomething = useEvent(() => {
    return !!timer.current
  })

  useEffect(() => cancel, [])

  return [doSomethingLater, cancel, isWaitingToDoSomething] as const
}
