import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'

export function useResize(
  func: (...args: unknown[]) => unknown,
  wait: number,
  options?: DebounceOptions,
) {
  const fn = useEvent(func)

  useEffect(() => {
    const handler = throttle(fn, wait, options)
    Taro.onWindowResize(handler)

    return () => {
      Taro.offWindowResize(handler)
    }
  }, [])
}
