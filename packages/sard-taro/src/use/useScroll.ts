import { useMemo } from 'react'
import { usePageScroll } from '@tarojs/taro'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'
import { AnyFunction } from '../base'

export function useScroll(
  callback: AnyFunction,
  wait: number,
  options?: DebounceOptions,
) {
  const cb = useEvent(callback)
  const handler = useMemo(() => {
    return throttle(cb, wait, options)
  }, [])

  usePageScroll(handler)
}

export default useScroll
