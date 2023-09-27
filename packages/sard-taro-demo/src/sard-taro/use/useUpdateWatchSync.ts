/**
 * update 阶段的同步监听
 */

import { DependencyList, useLayoutEffect, useMemo, useRef } from 'react'

export function useUpdateWatchSync(
  factory: () => void,
  deps: DependencyList | undefined,
) {
  const firstMount = useRef(false)

  useLayoutEffect(() => {
    firstMount.current = true
    return () => {
      firstMount.current = false
    }
  }, [])

  return useMemo(() => {
    if (firstMount.current) {
      factory()
    }
  }, deps)
}
