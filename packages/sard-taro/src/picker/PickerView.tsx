import { FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import {
  PickerView as TaroPickerView,
  PickerViewProps as TaroPickerViewProps,
  PickerViewColumn,
  View,
} from '@tarojs/components'
import { BaseProps, PrimitiveType } from '../base'

export interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}

export type PickerOption =
  | {
      label?: ReactNode
      value?: string | number
      children?: PickerOption[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: PropertyKey]: any
    }
  | PrimitiveType

export interface PickerViewProps
  extends BaseProps,
    Omit<TaroPickerViewProps, 'style' | 'onChange'> {
  columns?: PickerOption[] | PickerOption[][]
  optionKeys?: PickerOptionKeys
  value?: number[]
  onChange?: (value: number[], selectedOptions: PickerOption[]) => void
}

export const PickerView: FC<PickerViewProps> = (props) => {
  const {
    columns = [],
    optionKeys,
    value,
    onChange,
    indicatorClass,
    ...restProps
  } = props

  const finalColumns = useMemo(() => {
    if (!Array.isArray(columns[0])) {
      return [columns]
    }
    return columns
  }, [columns])

  const handleChange = (event) => {
    const value = event.detail.value
    onChange?.(
      value,
      finalColumns.map((column, index) => column[value[index]]),
    )
  }

  return (
    <TaroPickerView
      {...restProps}
      indicatorClass={classNames('sar-picker-indicator', indicatorClass)}
      value={value}
      onChange={handleChange}
    >
      {finalColumns.map((column, columnIndex) => {
        return (
          <PickerViewColumn key={columnIndex}>
            {column.map((option, optionIndex) => {
              const isObject = option instanceof Object
              return (
                <View className="sar-picker-item" key={optionIndex}>
                  <View className="sar-picker-item-text">
                    {isObject ? option[optionKeys.label] : option}
                  </View>
                </View>
              )
            })}
          </PickerViewColumn>
        )
      })}
    </TaroPickerView>
  )
}
