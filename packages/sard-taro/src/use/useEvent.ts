/**
 * 在保持函数引用不变的前提下，可以在函数里面访问最新的变量。
 */

import { useRef, useCallback } from 'react'

export function useEvent<
  T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown,
>(callback: T) {
  const callbackRef = useRef<T>()

  callbackRef.current = callback

  return useCallback<T>(
    ((...args: unknown[]) => {
      return callbackRef.current?.(...args)
    }) as unknown as T,
    [],
  )
}

export default useEvent
