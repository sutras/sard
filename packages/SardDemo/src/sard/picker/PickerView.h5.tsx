import { Children, ReactElement, cloneElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { AnyFunction, BaseProps } from '../base'
import { useBem } from '../use'
import { PickerViewColumn, PickerViewColumnProps } from './PickerViewColumn'

export { PickerViewColumn }

export interface PickerViewProps extends BaseProps {
  value?: number[]
  onChange?: (event: {
    detail: {
      value: number[]
    }
  }) => void
  immediateChange?: boolean
  onPickEnd?: AnyFunction
  maskClass?: string
  indicatorStyle?: string
  indicatorClass?: string
}

export const PickerView = (props: PickerViewProps) => {
  const {
    children,
    className,
    value,
    onChange,
    immediateChange,
    maskClass,
    indicatorStyle,
    indicatorClass,
    ...restProps
  } = props

  const [bem] = useBem('picker')

  const currentValue = useRef(value || [])

  useEffect(() => {
    if (value) {
      currentValue.current = value
    }
  }, [value])

  return (
    <View {...restProps} className={classNames(bem.e('wrapper'), className)}>
      {Children.map(
        children,
        (element: ReactElement<PickerViewColumnProps>, i) => {
          return cloneElement(element, {
            value: value?.[i] || 0,
            immediateChange,
            maskClass,
            indicatorStyle,
            indicatorClass,
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
