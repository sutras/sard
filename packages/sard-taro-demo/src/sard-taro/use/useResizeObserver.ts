/**
 * 用于解决组件不显示时无法操作节点滚动或尺寸相关接口的问题
 */

import { useMemo, useRef, createElement, memo } from 'react'
import { useEvent } from './useEvent'

export function useResizeObserver(callback: (...args: unknown[]) => unknown) {
  const resizeObserver = useRef<ResizeObserver>()

  const memoCallback = useEvent(() => {
    callback()
  })

  const observe = useEvent((node: HTMLElement | null) => {
    resizeObserver.current?.disconnect()
    if (node) {
      resizeObserver.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            memoCallback()
          }
        }
      })

      resizeObserver.current.observe(node)
    }
  })

  const ResizeSpy = useMemo(
    () =>
      memo(() =>
        createElement('div', {
          style: {
            position: 'fixed',
            zIndex: -1,
            width: 1,
            height: 0,
            pointerEvents: 'none',
            opacity: 0,
          },
          ref: (node) => {
            observe(node)
          },
        }),
      ),
    [],
  )

  return [ResizeSpy] as const
}
