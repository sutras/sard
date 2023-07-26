/**
 * 简化受控组件状态的操作
 * ==========================
 */

import { useRef, useCallback } from 'react'

export function useEvent<T extends (...args: unknown[]) => unknown>(
  callback: T,
) {
  const callbackRef = useRef<T>()

  callbackRef.current = callback

  return useCallback((...args: unknown[]) => {
    const callback = callbackRef.current
    return callback?.(...args)
  }, [])
}

export default useEvent
