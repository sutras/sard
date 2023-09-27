/**
 * 扩展 useState 的功能，可以同步监听 value 以便更新自身的值
 */

import { useMemo, useRef } from 'react'
import { useForceRender } from './useForceRender'
import { useEvent } from './useEvent'

export function useWatchStateSync<T>(value: T) {
  const forceRender = useForceRender()

  const stateRef = useRef(value)

  useMemo(() => {
    stateRef.current = value
  }, [value])

  const setState = useEvent((value: T) => {
    stateRef.current = value
    forceRender()
  })

  return [stateRef.current, setState] as const
}
