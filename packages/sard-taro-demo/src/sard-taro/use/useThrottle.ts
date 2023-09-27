import { useEffect, useMemo } from 'react'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'
import { AnyFunction } from '../base'

export function useThrottle(
  callback: AnyFunction,
  wait: number,
  options?: DebounceOptions,
) {
  const cb = useEvent(callback)
  const handler = useMemo(() => {
    return throttle(cb, wait, options)
  }, [])

  useEffect(() => () => handler.cancel(), [])

  return handler
}
