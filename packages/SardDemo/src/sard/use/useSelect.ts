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
import { useEvent } from './useEvent'

export interface SelectContextValue<V> {
  value: V
  onChange: (value: V) => void
}

export interface UseSelectOptions extends UseControllableValueOptions<boolean> {
  clearable?: boolean
}

export const SelectContext = createContext<SelectContextValue<any> | null>(null)

export function useSelect<T extends 'single' | 'multiple', V>(
  type: T,
  options: UseSelectOptions,
  value: V,
) {
  const context = useContext(SelectContext)

  const { clearable } = options

  const [innerSelected, setInnerSelected] = useControllableValue(options)

  useEffect(() => {
    if (context) {
      setInnerSelected(
        type === 'single'
          ? context.value === value
          : (context.value as V[]).includes(value),
        value,
      )
    }
  }, [context])

  const toggle = useEvent(() => {
    if (type === 'single' && innerSelected && !clearable) {
      return
    }

    if (context) {
      let nextValue

      if (type === 'single') {
        if (innerSelected) {
          nextValue = undefined
        } else {
          nextValue = value
        }
      } else {
        if (innerSelected) {
          nextValue = (context.value as V[]).filter((item) => item !== value)
        } else {
          nextValue = (context.value as V[]).concat(value)
        }
      }

      context.onChange(nextValue)
    } else {
      setInnerSelected(type === 'single' ? true : !innerSelected, value)
    }
  })

  return [innerSelected, toggle] as const
}

export function useSelectGroup<V>(options: UseControllableValueOptions<V>) {
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
