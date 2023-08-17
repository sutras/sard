/**
 * 通过 useRef 保存最新的 prop，以便可以在 useCallback 函数里面使用。
 */

import { useRef } from 'react'

export function usePropRef<T>(prop: T) {
  const ref = useRef<T>(prop)

  ref.current = prop

  return ref
}
