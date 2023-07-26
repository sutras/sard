import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import {
  useControllableValue,
  UseControllableValueOptions,
} from './useControllableValue'
import useEvent from './useEvent'

export interface CheckContextValue<V> {
  value: V
  onChange: (value: V) => void
}

export const CheckContext = createContext<CheckContextValue<unknown>>(null)

export function useCheck<T extends 'single' | 'multiple', V>(
  type: T,
  options: UseControllableValueOptions<boolean>,
  value: V,
) {
  const context = useContext(CheckContext)

  const [innerChecked, setInnerChecked] = useControllableValue(options)

  useEffect(() => {
    if (context) {
      setInnerChecked(
        type === 'single'
          ? context.value === value
          : (context.value as V[]).includes(value),
        value,
      )
    }
  }, [context])

  const toggle = useEvent(() => {
    if (type === 'single' && innerChecked) {
      return
    }

    if (context) {
      context.onChange(
        type === 'single'
          ? value
          : innerChecked
          ? (context.value as V[]).filter((item) => item !== value)
          : (context.value as V[]).concat(value),
      )
    } else {
      setInnerChecked(type === 'single' ? true : !innerChecked, value)
    }
  })

  return [innerChecked, toggle] as const
}

export function useCheckGroup<V>(options: UseControllableValueOptions<V>) {
  const [innerValue, setInnerValue] = useControllableValue(options)

  const handleChange = useCallback((val: V) => {
    setInnerValue(val)
  }, [])

  const context = useMemo(
    () => ({
      value: innerValue,
      onChange: handleChange,
    }),
    [innerValue],
  )

  return context
}
