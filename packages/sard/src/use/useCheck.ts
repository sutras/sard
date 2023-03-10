import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import useControlledValue, {
  useControlledValueOptions,
} from './useControlledValue'
import useEvent from './useEvent'

export interface CheckGroupContext<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? any : any[],
> {
  value: V
  onChange: (value: V) => void
}

export const CheckContext = createContext<CheckGroupContext<
  'single' | 'multiple'
> | null>(null)

export function useCheck<T extends 'single' | 'multiple'>(
  type: T,
  props: any,
  options: useControlledValueOptions<boolean>,
  value: any,
) {
  const context = useContext(CheckContext)

  const [innerChecked, setInnerChecked] = useControlledValue<boolean>(
    props,
    options,
  )

  useEffect(() => {
    if (context) {
      setInnerChecked(
        type === 'single'
          ? context.value === value
          : context.value.includes(value),
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
          ? context.value.filter((item) => item !== value)
          : context.value.concat(value),
      )
    } else {
      setInnerChecked(type === 'single' ? true : !innerChecked, value)
    }
  })

  return [innerChecked, toggle] as const
}

export function useCheckGroup<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? any : any[],
>(props: any, options: useControlledValueOptions<V>) {
  const [innerValue, setInnerValue] = useControlledValue<V>(props, options)

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
