import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
  useState,
  useMemo,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import {
  PickerOption,
  PickerOptionKeys,
  PickerView,
  PickerViewProps,
} from './PickerView'
import { useControllableValue, useEvent } from '../use'
import { arrayEqual, nestedToMulti } from '../utils'
import useUpdateEffect from '../use/useUpdateEffect'
import { AnyType } from '../base'

export * from './PickerView'

export interface PickerProps
  extends Omit<PickerViewProps, 'value' | 'onChange'> {
  value?: (number | string)[]
  defaultValue?: (number | string)[]
  onChange?: (
    value: (number | string)[],
    selectedOptions: PickerOption[],
    selectedIndex: number[],
  ) => void
}

export interface PickerRef {
  getTriggerArgsForcibly: () => readonly [
    value: (number | string)[],
    selectedOptions: PickerOption[],
    selectedIndex: number[],
  ]
}

export interface PickerFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<PickerProps> & RefAttributes<PickerRef>
  > {
  canListenOuterValueChange: boolean
  alwaysHasValue: boolean
}

const getValueByOption = (
  option: PickerOption,
  optionKeys: PickerOptionKeys,
) => {
  const isPrimitive = option !== null && typeof option !== 'object'
  return (isPrimitive ? option : option[optionKeys.value]) as string | number
}

const getValuesByOptions = (
  options: PickerOption[],
  optionKeys: PickerOptionKeys,
) => {
  return options.map((option) => getValueByOption(option, optionKeys))
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
  value: AnyType[],
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
      (option) => getValueByOption(option, optionKeys) === value[index],
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

const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  children: 'children',
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
    ...restProps
  } = props

  const fieldKeys = Object.assign({}, defaultOptionKeys, optionKeys)

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => {
      return [] as (number | string)[]
    },
  })

  const finalColumns: PickerOption[][] = useMemo(() => {
    switch (getColumnsType(columns, fieldKeys)) {
      case 'single':
        return [columns]
      case 'multi':
        return columns
      case 'cascader':
        return nestedToMulti(columns, innerValue, fieldKeys)
    }
  }, [columns, innerValue])

  const [columnIndexes, setColumnIndexes] = useState<number[]>(() => {
    return getIndexesByValue(innerValue, columns, fieldKeys)
  })

  useUpdateEffect(() => {
    if (value) {
      const indexes = getIndexesByValue(value, columns, fieldKeys)
      if (!arrayEqual(indexes, columnIndexes)) {
        setColumnIndexes(indexes)
      }
    }
  }, [value])

  const handleChange: PickerViewProps['onChange'] = (indexes) => {
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
      getValuesByOptions(selectedOptions, fieldKeys),
      selectedOptions,
      indexes,
    )
  }

  const handlePickEnd = () => {
    if (immediateChange && getColumnsType(columns, fieldKeys) === 'cascader') {
      setColumnIndexes((indexes) => indexes.slice())
    }
  }

  const getTriggerArgsForcibly = useEvent(() => {
    const options = getOptionsByIndexes(columnIndexes, columns, fieldKeys)
    return [
      getValuesByOptions(options, fieldKeys),
      options,
      columnIndexes,
    ] as const
  })

  useImperativeHandle(ref, () => ({
    getTriggerArgsForcibly,
  }))

  return (
    <PickerView
      {...restProps}
      className={classNames('sar-picker', className)}
      optionKeys={fieldKeys}
      columns={finalColumns}
      value={columnIndexes}
      immediateChange={immediateChange}
      onChange={handleChange}
      onPickEnd={handlePickEnd}
    />
  )
}) as PickerFC

Picker.canListenOuterValueChange = true
Picker.alwaysHasValue = true

export default Picker
