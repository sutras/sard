/**
 * 封装受控组件状态的操作。
 */

import { useRef, useMemo, SetStateAction } from 'react'
import useForceRender from './useForceRender'
import useEvent from './useEvent'

export interface useControlledValueOptions<T> {
  defaultValue?: T | (() => T)
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
  transform?: (value: T) => T
  controlled?: (value: T) => T
}

const getDefaultValue = (defaultValue: any) => {
  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

export function useControlledValue<T = any>(
  props: any,
  options: useControlledValueOptions<T> = {},
) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
    transform,
    controlled,
  } = options

  const value: T = props[valuePropName]
  const isControlled = value !== undefined

  let changeFromOuter: T

  const updateFromInner = useRef(false)

  const stateRef = useRef<T>(
    useMemo(() => {
      const val: T = isControlled
        ? value
        : props[defaultValuePropName] ?? getDefaultValue(defaultValue)
      return transform ? transform(val) : val
    }, []),
  )

  const oldState = stateRef.current

  if (isControlled) {
    let nextValue = controlled ? controlled(value) : value
    nextValue = transform ? transform(nextValue) : nextValue
    stateRef.current = nextValue
  }

  const forceRender = useForceRender()

  function setState(val: SetStateAction<T>, ...args: any[]) {
    const nextState =
      typeof val === 'function'
        ? (val as (...args: any[]) => any)(stateRef.current)
        : val

    if (nextState === stateRef.current) {
      return
    }

    if (!isControlled) {
      stateRef.current = nextState
      forceRender()
    }

    updateFromInner.current = true
    props[trigger]?.(nextState, ...args)
  }

  if (
    isControlled &&
    !updateFromInner.current &&
    oldState !== stateRef.current
  ) {
    changeFromOuter = stateRef.current
  }

  updateFromInner.current = false

  return [stateRef.current, useEvent(setState), changeFromOuter] as const
}

export default useControlledValue
