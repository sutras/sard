/**
 * 可受控的状态
 */

import { useRef, useMemo, SetStateAction } from 'react'
import useForceRender from './useForceRender'
import useEvent from './useEvent'
import useLayoutUpdateEffect from './useLayoutUpdateEffect'
import { isFunction, isNullish } from '../utils'
import { AnyType } from '../base'

export interface UseControllableValueOptions<T> {
  value?: T
  defaultValue?: T
  trigger?: (value: T, ...args: AnyType[]) => void
  initialValue?: T | (() => T)
  postValue?: (value: T) => T
}

function getMayFnValue(value) {
  return isFunction(value) ? value() : value
}

const hasValue = <T>(value: T) => {
  return value !== undefined
}

export function useControllableValue<T>(
  options: UseControllableValueOptions<T> = {},
) {
  const { defaultValue, value, trigger, initialValue, postValue } = options

  const stateRef = useRef<T>(
    useMemo(() => {
      return hasValue(value)
        ? value
        : hasValue(defaultValue)
        ? defaultValue
        : getMayFnValue(initialValue)
    }, []),
  )

  // 受控
  if (hasValue(value)) {
    stateRef.current = value
  }

  if (isNullish(stateRef.current) && !isNullish(initialValue)) {
    stateRef.current = getMayFnValue(initialValue)
  }

  if (postValue) {
    stateRef.current = postValue(stateRef.current)
  }

  const forceRender = useForceRender()

  // change（同步）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setState = useEvent((v: SetStateAction<T>, ...args: any[]) => {
    const nextState = isFunction(v) ? (v as (s: T) => T)(stateRef.current) : v

    if (nextState === stateRef.current) {
      return
    }

    if (!hasValue(value)) {
      stateRef.current = nextState
      forceRender()
    }

    trigger?.(nextState, ...args)
  })

  // 受控切换到非受控
  useLayoutUpdateEffect(() => {
    if (!hasValue(value)) {
      stateRef.current = value
      forceRender()
    }
  }, [value])

  return [stateRef.current, setState] as const
}

export default useControllableValue
