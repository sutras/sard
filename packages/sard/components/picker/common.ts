import { type DefaultProps } from '../config'
import { type OptionKeys, type UseOptionKeysReturn } from '../../use'

export interface PickerProps<T> {
  columns?: T[] | T[][]
  optionKeys?: OptionKeys
  modelValue?: any
}

export const defaultPickerProps: DefaultProps<PickerProps<any>> = {
  columns: () => [],
}

export interface PickerSlots<T> {
  option?(props: { option: T; rowIndex: number; columnIndex: number }): any
}

export interface PickerEmits<T> {
  (e: 'update:modelValue', value: any, selectedOptions: T[], indexes: number[]): void
  (e: 'change', value: any, selectedOptions: T[], indexes: number[]): void
}

export function getColumnsType<T>(columns: T[] | T[][], { getChildren }: UseOptionKeysReturn) {
  const firstColumn = columns[0]
  if (Array.isArray(firstColumn)) {
    return 'multi'
  }
  if (firstColumn && typeof firstColumn === 'object' && Array.isArray(getChildren(firstColumn))) {
    return 'cascader'
  }
  return 'single'
}

export function getOptionsByIndexes<T>(
  indexes: number[],
  columns: T[] | T[][],
  useOptionKeysReturn: UseOptionKeysReturn,
): T[] {
  const { getChildren } = useOptionKeysReturn

  function recurse(columns: T[], i = 0): T[] {
    const index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index]
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn)) {
      return [option, ...recurse(nextColumn, ++i)]
    }
    return [option]
  }

  switch (getColumnsType(columns, useOptionKeysReturn)) {
    case 'single':
      return [columns[indexes[0]] as T]
    case 'multi':
      return (columns as T[][]).map((column, i) => column[indexes[i]])
    case 'cascader':
      return recurse(columns as T[])
  }
}

export function getCascaderValidIndexes<T>(
  indexes: number[],
  columns: T[] | T[][],
  { getChildren }: UseOptionKeysReturn,
) {
  function recurse(columns: T[] | T[][], i = 0): number[] {
    let index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index] as T
    if (!option) {
      index = 0
    }
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }
  return recurse(columns)
}

export function getMaySingleValueByOptions<T>(
  options: T[],
  useOptionKeysReturn: UseOptionKeysReturn,
  columns: T[] | T[][],
) {
  const { getValue } = useOptionKeysReturn

  const values = options.map((option) => getValue(option))

  return getColumnsType(columns, useOptionKeysReturn) === 'single' ? values[0] : values
}

export function getIndexesByValue<T>(
  value: any[],
  columns: T[] | T[][],
  useOptionKeysReturn: UseOptionKeysReturn,
) {
  const { getValue, getChildren } = useOptionKeysReturn
  const type = getColumnsType(columns, useOptionKeysReturn)

  function recurse(columns: T[], i = 0): number[] {
    let index = columns.findIndex((option) => getValue(option) === value[i])
    if (index === -1) {
      index = 0
    }
    const option = columns[index]

    const nextColumn: T[] = getChildren(option)

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }

  if (type === 'cascader') {
    return recurse(columns as T[])
  }

  if (type === 'single') {
    columns = [columns as T]
  }

  return (columns as T[][]).map((column, index) => {
    const optionIndex = column.findIndex((option) => getValue(option) === value[index])
    return Math.max(optionIndex, 0)
  })
}

export function getInitialValue<T>(columns: T[] | T[][], useOptionKeysReturn: UseOptionKeysReturn) {
  const { getChildren, getValue } = useOptionKeysReturn

  function recurse(columns: T[], options: T[]): T {
    const option = columns[0] as T
    options.push(option)
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn) && nextColumn.length > 0) {
      return recurse(nextColumn, options)
    }
    return option
  }

  switch (getColumnsType(columns, useOptionKeysReturn)) {
    case 'single':
      return [getValue(columns[0]), [columns[0]]]
    case 'multi':
      return [
        (columns as T[][]).map((column) => getValue(column[0])),
        (columns as T[][]).map((column) => column[0]),
      ]
    case 'cascader': {
      const options: T[] = []
      recurse(columns as T[], options)
      return [options.map((option) => getValue(option)), options]
    }
  }
}
