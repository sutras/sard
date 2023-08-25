/**
 * 使在函数组件中更好使用 setTimeout，可以重置或清除定时器
 */

import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'
import { AnyFunction } from '../base'

interface UseSetTimeoutOptions {
  canReset?: AnyFunction
  tailing?: boolean
}

export function useSetTimeout(
  callback: AnyFunction,
  duration: number,
  options: UseSetTimeoutOptions = {},
) {
  const { canReset = () => true, tailing } = options

  const timer = useRef(0)

  const func = useEvent(callback)
  const canResetCallback = useEvent(canReset)

  const clear = useEvent(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = 0
      if (tailing) {
        func()
      }
    }
  })

  const reset = useEvent((...args) => {
    clear()
    if (canResetCallback()) {
      timer.current = setTimeout(() => {
        timer.current = 0
        func(...args)
      }, duration) as unknown as number
    }
  })

  const running = useEvent(() => {
    return !!timer.current
  })

  useEffect(() => clear, [])

  return [reset, clear, running] as const
}
