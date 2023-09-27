/**
 * 可受控的状态
 */

import { useRef, useMemo, SetStateAction } from 'react'
import { useForceRender } from './useForceRender'
import { useEvent } from './useEvent'
import { isFunction, isNullish, isUndefined } from '../utils'
import { useUpdateWatchSync } from './useUpdateWatchSync'

export interface UseControllableValueOptions<T> {
  value?: T
  defaultValue?: T
  trigger?: (value: T, ...args: any[]) => void
  initialValue?: T | (() => T)
  postValue?: (value: T) => T
}

function getMayFnValue(value) {
  return isFunction(value) ? value() : value
}

function hasValue<T = unknown>(value: T): value is Exclude<T, undefined> {
  return !isUndefined(value)
}

function noValue(value: unknown): value is undefined {
  return isUndefined(value)
}

export function useControllableValue<T, R = T>(
  options: UseControllableValueOptions<T> = {},
) {
  const { defaultValue, value, trigger, initialValue, postValue } = options

  const stateRef = useRef<T | undefined>(
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

  // 受控切换到非受控
  useUpdateWatchSync(() => {
    if (noValue(value)) {
      stateRef.current = value
    }
  }, [value])

  if (isNullish(stateRef.current) && !isNullish(initialValue)) {
    stateRef.current = getMayFnValue(initialValue)
  }

  if (postValue) {
    stateRef.current = postValue(stateRef.current as any)
  }

  const forceRender = useForceRender()

  // change（同步）
  const setState = useEvent((v: SetStateAction<T>, ...args: any[]) => {
    const nextState = isFunction(v)
      ? (v as (s: T) => T)(stateRef.current as any)
      : v

    if (nextState === stateRef.current) {
      return
    }

    if (noValue(value)) {
      stateRef.current = nextState
      forceRender()
    }

    trigger?.(nextState, ...args)
  })

  return [stateRef.current as R, setState] as const
}
