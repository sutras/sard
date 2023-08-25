/**
 * 在保持函数引用不变的前提下，可以在函数里面访问最新的变量。
 */

import { useRef, useCallback } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export function useEvent<T extends Function>(callback: T) {
  const callbackRef = useRef<T>()

  callbackRef.current = callback

  return useCallback<T>(
    ((...args: any[]) => {
      return callbackRef.current?.(...args)
    }) as any as T,
    [],
  )
}
