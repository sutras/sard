/**
 * useRef 的memo版本，
 * 和 useRef 一样的使用方式，在依赖改变时，会调用函数并将返回值赋值给 ref。
 */

import { useRef, useEffect, useMemo } from 'react'

export function useMemoRef<T>(factory: () => T, deps?: any[] | undefined) {
  const memoized = useMemo(factory, deps)
  const ref = useRef<T>(memoized)

  useEffect(() => {
    ref.current = memoized
  })

  return ref
}

export default useMemoRef
