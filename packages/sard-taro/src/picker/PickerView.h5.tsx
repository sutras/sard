import { AnyFunction, BaseProps } from '../base'
import { PickerViewColumn, PickerViewColumnProps } from './PickerViewColumn'
import { View } from '@tarojs/components'
import { useBem } from '../use'
import classNames from 'classnames'
import { Children, ReactElement, cloneElement, useEffect, useRef } from 'react'

export { PickerViewColumn }

export interface PickerViewProps extends BaseProps {
  value?: number[]
  onChange?: (event: {
    detail: {
      value: number[]
    }
  }) => void
  indicatorStyle?: string
  indicatorClass?: string
  immediateChange?: boolean
  onPickEnd?: AnyFunction
}

export const PickerView = (props: PickerViewProps) => {
  const {
    children,
    className,
    value,
    onChange,
    immediateChange,
    ...restProps
  } = props

  const [bem] = useBem('picker')

  const currentValue = useRef(value || [])

  useEffect(() => {
    currentValue.current = value
  }, [value])

  return (
    <View {...restProps} className={classNames(bem.e('wrapper'), className)}>
      {Children.map(
        children,
        (element: ReactElement<PickerViewColumnProps>, i) => {
          return cloneElement(element, {
            value: value?.[i] || 0,
            immediateChange,
            onChange(index) {
              currentValue.current[i] = index
              const nextValue = currentValue.current.map((item) => item || 0)
              currentValue.current = nextValue.slice()
              onChange?.({
                detail: {
                  value: nextValue,
                },
              })
            },
          })
        },
      )}
    </View>
  )
}
