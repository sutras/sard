import { useEffect } from 'react'
import { throttle, DebounceOptions } from '../utils'
import { useEvent } from './useEvent'

export function useScroll(
  callback: (...args: any[]) => any,
  wait: any,
  options?: DebounceOptions,
  target: { current: any } = { current: window },
) {
  const cb = useEvent(callback)

  useEffect(() => {
    const handler = throttle(cb, wait, options)
    target.current?.addEventListener('scroll', handler)

    return () => {
      target.current?.removeEventListener('scroll', handler)
    }
  }, [])
}

export default useScroll
