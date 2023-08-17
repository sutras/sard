/**
 * 用法同 useEffect update 阶段调用
 */

import { useEffect, useRef } from 'react'

export const useUpdateEffect: typeof useEffect = (callback, deps) => {
  const firstMount = useRef(false)

  useEffect(() => {
    if (firstMount.current) {
      return callback()
    }
  }, deps)

  useEffect(() => {
    firstMount.current = true
    return () => {
      firstMount.current = false
    }
  }, [])
}
