/**
 * 强制更新组件
 */

import { useReducer } from 'react'

export function useForceRender() {
  const [, forceRender] = useReducer((s) => s + 1, 0)

  return forceRender
}
