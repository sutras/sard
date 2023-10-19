import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
  useState,
  useMemo,
  useImperativeHandle,
  useRef,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useControllableValue, useEvent, useUpdateEffect } from '../use'
import {
  arrayEqual,
  isAndroid,
  isIOS,
  isNullish,
  nestedToMulti,
  toArray,
} from '../utils'
import { PickerView, PickerViewColumn, PickerViewProps } from './PickerView'
import Popout, { PopoutProps } from '../popout'
import CustomWrapper from '../custom-wrapper'

export * from './PickerView'

export interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}

type PickerOptionObject = {
  label?: string | number
  value?: string | number
  children?: PickerOption[]
  [key: PropertyKey]: any
}

export type PickerOption = PickerOptionObject | string | number

export interface PickerProps
  extends Omit<PickerViewProps, 'value' | 'onChange'> {
  columns?: PickerOption[] | PickerOption[][]
  optionKeys?: PickerOptionKeys
  value?: any
  defaultValue?: any
  onChange?: (
    value: any,
    selectedOptions: PickerOption[],
    selectedIndex: number[],
  ) => void
  withPopout?: boolean
  popoutProps?: PopoutProps
  outletFormatter?: (labels: (string | number)[]) => string
}

export interface PickerRef {
  getValueForcibly: () => any
}

export interface PickerFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<PickerProps> & RefAttributes<PickerRef>
  > {
  alwaysHasValue: boolean
  outletFormatter: typeof outletFormatter
  defaultOutletFormatter: typeof defaultOutletFormatter
}

const getValueOrLabelByOption = (
  option: PickerOption,
  valueOrLabelKey: string,
) => {
  const isPrimitive = option !== null && typeof option !== 'object'
  return (
    isPrimitive ? option : (option as PickerOptionObject)[valueOrLabelKey]
  ) as string | number
}

const getValuesByOptions = (options: PickerOption[], valueKey: string) => {
  return options.map((option) => getValueOrLabelByOption(option, valueKey))
}

const getColumnsType = (
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
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
  optionKeys: Required<PickerOptionKeys>,
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
  optionKeys: Required<PickerOptionKeys>,
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
  optionKeys: Required<PickerOptionKeys>,
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
  optionKeys: Required<PickerOptionKeys>,
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

function outletFormatter(props: PickerProps, value: any) {
  if (isNullish(value) || (Array.isArray(value) && value.length === 0)) {
    return ''
  }

  const optionKeys = Object.assign({}, defaultOptionKeys, props.optionKeys)

  const indexes = getIndexesByValue(
    toArray(value),
    props.columns || [],
    optionKeys,
  )
  const options = getOptionsByIndexes(indexes, props.columns || [], optionKeys)

  const labels = options.map((option) =>
    getValueOrLabelByOption(option, optionKeys.label),
  )

  const formatter = props.outletFormatter ?? Picker.defaultOutletFormatter

  return formatter(labels)
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
    withPopout,
    popoutProps,
    outletFormatter,
    ...restProps
  } = props

  void outletFormatter

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
        const nextIndexes: number[] = []
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
  })

  const handlePickEnd = () => {
    if (immediateChange && getColumnsType(columns, fieldKeys) === 'cascader') {
      setColumnIndexes((indexes) => indexes.slice())
    }
  }

  const getValueForcibly = useEvent(() => {
    const options = getOptionsByIndexes(columnIndexes, columns, fieldKeys)

    return getMaySingleValueByOptions(options, fieldKeys, columns)
  })

  useImperativeHandle(
    ref,
    () => ({
      getValueForcibly,
    }),
    [],
  )

  const renderElement = () => {
    return (
      <CustomWrapper>
        <View>
          <PickerView
            {...restProps}
            className={classNames(bem.b(), className)}
            indicatorClass={bem.e('indicator')}
            maskClass={bem.e('mask')}
            {...((isAndroid
              ? {
                  // tips: 官方文档对RN无效，以下设置可作用于安卓
                  // https://github.com/ant-design/ant-design-mobile-rn/blob/master/components/picker-view/PickerView.tsx
                  indicatorStyle: { height: 48, lineHeight: 48 },
                  itemStyle: { height: 48, lineHeight: 48, fontSize: 16 },
                }
              : isIOS
              ? {
                  itemStyle: { fontSize: 16, height: 240 },
                }
              : null) as any)}
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
                      </View>
                    )
                  })}
                </PickerViewColumn>
              )
            })}
          </PickerView>
        </View>
      </CustomWrapper>
    )
  }

  if (withPopout) {
    return <Popout {...popoutProps}>{renderElement()}</Popout>
  }

  return renderElement()
}) as PickerFC

Picker.alwaysHasValue = true
Picker.outletFormatter = outletFormatter
Picker.defaultOutletFormatter = defaultOutletFormatter

export default Picker
