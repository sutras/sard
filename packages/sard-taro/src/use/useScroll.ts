import { useMemo } from 'react'
import { usePageScroll } from '@tarojs/taro'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'

export function useScroll(
  callback: (...args: unknown[]) => unknown,
  wait: unknown,
  options?: DebounceOptions,
) {
  const cb = useEvent(callback)
  const handler = useMemo(() => {
    return throttle(cb, wait, options)
  }, [])

  usePageScroll(handler)
}

export default useScroll
