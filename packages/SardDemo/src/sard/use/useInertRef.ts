/**
 * useRef 的惰性初始化版本，
 * 接受一个函数，在函数中计算并返回初始的 MutableRefObject，
 * 此函数只在初始渲染时被调用。
 */

import { useRef } from 'react'

export function useInertRef<T>(callback: () => T) {
  const ref = useRef<T>()
  const initialized = useRef(false)
  if (!initialized.current) {
    ref.current = callback()
    initialized.current = true
  }
  return ref as React.MutableRefObject<T>
}
