/**
 * 用法同 useLayoutEffect，但只在 update 阶段调用
 */

import { useLayoutEffect, useRef } from 'react'

export const useLayoutUpdateEffect: typeof useLayoutEffect = (
  callback,
  deps,
) => {
  const firstMount = useRef(false)

  useLayoutEffect(() => {
    if (firstMount.current) {
      return callback()
    }
  }, deps)

  useLayoutEffect(() => {
    firstMount.current = true
    return () => {
      firstMount.current = false
    }
  }, [])
}

export default useLayoutUpdateEffect
