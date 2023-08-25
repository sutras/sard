import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
  useState,
  useMemo,
  useImperativeHandle,
  useEffect,
  useRef,
  ReactNode,
} from 'react'
import classNames from 'classnames'
import { useBem, useControllableValue, useEvent } from '../use'
import { arrayEqual, isNullish, nestedToMulti, toArray } from '../utils'
import { useUpdateEffect } from '../use'
import { CustomWrapper, View } from '@tarojs/components'
import { PickerView, PickerViewColumn, PickerViewProps } from './PickerView'
import { PrimitiveType } from '../base'

export * from './PickerView'

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
      [key: PropertyKey]: any
    }
  | PrimitiveType

type ValueType = any

export interface PickerProps<V = ValueType>
  extends Omit<PickerViewProps, 'value' | 'onChange'> {
  columns?: PickerOption[] | PickerOption[][]
  optionKeys?: PickerOptionKeys
  value?: V
  defaultValue?: V
  onChange?: (
    value: V,
    selectedOptions: PickerOption[],
    selectedIndex: number[],
  ) => void
  onOutletChange?: (outletValue: any, isManual: boolean) => void
  outletFormatter?: (value: (string | number)[]) => string
}

export interface PickerRef {
  getTriggerArgsForcibly: () => readonly [value: any, outletValue: string]
}

export interface PickerFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<PickerProps> & RefAttributes<PickerRef>
  > {
  alwaysHasValue: boolean
  hasOutletChange: boolean
}

const getValueOrLabelByOption = (
  option: PickerOption,
  valueOrLabelKey: string,
) => {
  const isPrimitive = option !== null && typeof option !== 'object'
  return (isPrimitive ? option : option[valueOrLabelKey]) as string | number
}

const getValuesByOptions = (options: PickerOption[], valueKey: string) => {
  return options.map((option) => getValueOrLabelByOption(option, valueKey))
}

const getColumnsType = (
  columns: PickerOption[] | PickerOption[][],
  optionKeys: PickerOptionKeys,
) => {
  const firstColumn = columns[0]
  if (Array.isArray(firstColumn)) {
    return 'multi'
  }
  if (
    firstColumn &&
    typeof firstColumn === 'object' &&
    Array.isArray(firstColumn[optionKeys.children])
  ) {
    return 'cascader'
  }
  return 'single'
}

const getIndexesByValue = (
  value: any[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: PickerOptionKeys,
) => {
  const type = getColumnsType(columns, optionKeys)

  function recurse(columns, i = 0) {
    let index = columns.findIndex(
      (option) => option[optionKeys.value] === value[i],
    )
    if (index === -1) {
      index = 0
    }
    const option = columns[index]

    const nextColumn = option?.[optionKeys.children]

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }

  if (type === 'cascader') {
    return recurse(columns)
  }

  if (type === 'single') {
    columns = [columns]
  }

  return columns.map((column, index) => {
    const optionIndex = column.findIndex(
      (option) =>
        getValueOrLabelByOption(option, optionKeys.value) === value[index],
    )
    return Math.max(optionIndex, 0)
  })
}

const getOptionsByIndexes = (
  indexes: number[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: PickerOptionKeys,
): PickerOption[] => {
  function recurse(columns, i = 0) {
    const index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index]
    const nextColumn = option?.[optionKeys.children]

    if (Array.isArray(nextColumn)) {
      return [option, ...recurse(nextColumn, ++i)]
    }
    return [option]
  }

  switch (getColumnsType(columns, optionKeys)) {
    case 'single':
      return [columns[indexes[0]]]
    case 'multi':
      return columns.map((column, i) => column[indexes[i]])
    case 'cascader':
      return recurse(columns)
  }
}

function getCascaderValidIndexes(
  indexes: number[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: PickerOptionKeys,
) {
  function recurse(columns, i = 0) {
    let index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index]
    if (!option) {
      index = 0
    }
    const nextColumn = option?.[optionKeys.children]

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }
  return recurse(columns)
}

function getMaySingleValueByOptions(
  options: PickerOption[],
  optionKeys: PickerOptionKeys,
  columns: PickerOption[] | PickerOption[][],
) {
  const values = getValuesByOptions(options, optionKeys.value)

  getColumnsType(columns, optionKeys)

  return getColumnsType(columns, optionKeys) === 'single' ? values[0] : values
}

const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  children: 'children',
}

function defaultOutletFormatter(labels: (string | number)[]) {
  return labels.join('/')
}

export const Picker = forwardRef<PickerRef, PickerProps>((props, ref) => {
  const {
    className,
    columns = [],
    value,
    defaultValue,
    optionKeys,
    immediateChange = true,
    onChange,
    onOutletChange,
    outletFormatter = defaultOutletFormatter,
    ...restProps
  } = props

  const [bem] = useBem('picker')

  const fieldKeys = Object.assign({}, defaultOptionKeys, optionKeys)

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => {
      return [] as (number | string)[]
    },
  })

  const memoFinalColumns = useRef<any>()
  const finalColumns: PickerOption[][] = useMemo(() => {
    if (memoFinalColumns.current && (!innerValue || innerValue.length === 0)) {
      return memoFinalColumns.current
    }
    switch (getColumnsType(columns, fieldKeys)) {
      case 'single':
        return [columns]
      case 'multi':
        return columns
      case 'cascader':
        return nestedToMulti(columns, toArray(innerValue), fieldKeys)
    }
  }, [columns, innerValue])

  memoFinalColumns.current = finalColumns

  const [columnIndexes, setColumnIndexes] = useState<number[]>(() => {
    return getIndexesByValue(toArray(innerValue), columns, fieldKeys)
  })

  useUpdateEffect(() => {
    if (!isNullish(value)) {
      const indexes = getIndexesByValue(toArray(value), columns, fieldKeys)
      if (!arrayEqual(indexes, columnIndexes)) {
        setColumnIndexes(indexes)
      }
    }
  }, [value])

  const isManual = useRef(false)

  useEffect(() => {
    if (onOutletChange) {
      if (
        isNullish(innerValue) ||
        (Array.isArray(innerValue) && innerValue.length === 0)
      ) {
        onOutletChange('', false)
      } else {
        const indexes = getIndexesByValue(
          toArray(innerValue),
          columns,
          fieldKeys,
        )
        const options = getOptionsByIndexes(indexes, columns, fieldKeys)
        onOutletChange(
          outletFormatter(
            options.map((option) =>
              getValueOrLabelByOption(option, fieldKeys.label),
            ),
          ),
          isManual.current,
        )
        isManual.current = false
      }
    }
  }, [innerValue])

  const handleChange: PickerViewProps['onChange'] = useEvent((event) => {
    let indexes = event.detail.value
    const columnType = getColumnsType(columns, fieldKeys)

    if (columnType === 'cascader') {
      // 多列联动
      // bug: immediateChange 设为真时，
      //  后面列未滚动完，前面的列开始滚动,这时设置picker-view的value值时后面的列不会滚动到指定位置；
      //  如果后面的旧列比新列数据多，且滚动到底部了，会显示空白效果，因为往上滚动了。
      //  解决：在 handlePickEnd 回调中纠正数据。
      {
        let startIndex = -1
        const nextIndexes = []
        for (let i = 0; i < columnIndexes.length; i++) {
          if (startIndex < 0 && columnIndexes[i] !== indexes[i]) {
            startIndex = i
          }
          nextIndexes.push(startIndex > -1 && i > startIndex ? 0 : indexes[i])
        }
        indexes = nextIndexes
      }

      // 多列同时滚动时下标可能会超过当前列的长度，这里要做一个限制
      {
        const validIndexes = getCascaderValidIndexes(
          indexes,
          columns,
          fieldKeys,
        )
        if (!arrayEqual(indexes, validIndexes)) {
          indexes = validIndexes
        }
      }
    }

    const selectedOptions = getOptionsByIndexes(indexes, columns, fieldKeys)

    if (!arrayEqual(indexes, columnIndexes)) {
      setColumnIndexes(indexes)
    }

    setInnerValue(
      getMaySingleValueByOptions(selectedOptions, fieldKeys, columns),
      selectedOptions,
      indexes,
    )
    isManual.current = true
  })

  const handlePickEnd = () => {
    if (immediateChange && getColumnsType(columns, fieldKeys) === 'cascader') {
      setColumnIndexes((indexes) => indexes.slice())
    }
  }

  const getTriggerArgsForcibly = useEvent(() => {
    const options = getOptionsByIndexes(columnIndexes, columns, fieldKeys)
    return [
      getMaySingleValueByOptions(options, fieldKeys, columns),
      outletFormatter(
        options.map((option) =>
          getValueOrLabelByOption(option, fieldKeys.label),
        ),
      ),
    ] as const
  })

  useImperativeHandle(ref, () => ({
    getTriggerArgsForcibly,
  }))

  return (
    <CustomWrapper>
      <PickerView
        {...restProps}
        className={classNames(bem.b(), className)}
        indicatorClass={classNames(bem.e('indicator'))}
        value={columnIndexes}
        immediateChange={immediateChange}
        onChange={handleChange}
        onPickEnd={handlePickEnd}
      >
        {finalColumns.map((column, columnIndex) => {
          return (
            <PickerViewColumn key={columnIndex}>
              {column.map((option, optionIndex) => {
                const isObject = option instanceof Object
                return (
                  <View className={bem.e('item')} key={optionIndex}>
                    {isObject ? option[fieldKeys.label] : option}
                    {/* <View className={bem.e('item-text')}>
                  </View> */}
                  </View>
                )
              })}
            </PickerViewColumn>
          )
        })}
      </PickerView>
    </CustomWrapper>
  )
}) as PickerFC

Picker.alwaysHasValue = true
Picker.hasOutletChange = true

export default Picker
