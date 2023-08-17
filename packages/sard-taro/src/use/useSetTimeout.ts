/**
 * 使在函数组件中更好使用 setTimeout，可以重置或清除定时器
 */

import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'
import { useUpdateEffect } from './useUpdateEffect'

export function useSetTimeout(
  callback: (...args: unknown[]) => unknown,
  duration: number,
  canReset: (...args: unknown[]) => unknown = () => true,
) {
  const timer = useRef(0)

  const func = useEvent(callback)
  const canResetCallback = useEvent(canReset)

  const clear = useEvent(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = 0
    }
  })

  const reset = useEvent(() => {
    clear()
    if (canResetCallback()) {
      timer.current = setTimeout(func, duration) as unknown as number
    }
  })

  useEffect(() => clear, [])

  useUpdateEffect(() => reset, [duration])

  return [reset, clear] as const
}
