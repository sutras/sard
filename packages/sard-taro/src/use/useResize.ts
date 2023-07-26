import { useEffect } from 'react'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'
import Taro from '@tarojs/taro'

export function useResize(
  func: (...args: unknown[]) => unknown,
  wait: unknown,
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

export default useResize
