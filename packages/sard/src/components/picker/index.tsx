import {
  CSSProperties,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { useEvent, useControlledValue } from '../../use'

import {
  PickerColumn,
  PickerColumnExternalProps,
  PickerOption,
  PickerColumnRef,
  FieldNames,
} from './Column'
import { arrayEqual } from '../../utils'

export * from './Column'

export interface PickerPrivateProps {
  className?: string
  style?: CSSProperties
  columns?: PickerOption[][]
  fieldNames?: FieldNames
  value?: any[]
  defaultValue?: any[]
  onChange?: (value: any[], options: PickerOption[]) => void
  onColumnChange?: (
    columnIndex: number,
    option: PickerOption,
    index: number,
  ) => void
}

export type PickerProps = PickerPrivateProps & PickerColumnExternalProps

export interface PickerRef {
  getOptions: () => PickerOption[]
  pickImmediately: () => void
  setIndexesForcibly: (indexes: number[]) => void
}

const defaultFieldNames = {
  label: 'label',
  value: 'value',
  children: 'children',
}

export const Picker = forwardRef<PickerRef, PickerProps>((props, ref) => {
  const {
    // picker-column props
    itemHeight,
    focusHeight,

    // picker props
    className,
    style,
    columns = [],
    fieldNames,
    onChange,
    onColumnChange,
    ...restProps
  } = props

  const mergedFieldNames = useMemo(() => {
    return Object.assign({}, defaultFieldNames, fieldNames)
  }, [fieldNames])

  const [innerValue, setInnerValue] = useControlledValue(props, {
    defaultValue() {
      return columns.map((column) => column[0][mergedFieldNames.value])
    },
  })

  useEffect(() => {
    columnRefList.current.map((column, index) =>
      column.setIndexByValueForcibly(innerValue[index]),
    )
  }, [innerValue])

  const columnRefList = useRef<PickerColumnRef[]>([])

  const columnAnimating = useRef<{ [p: string]: boolean }>({})

  const refCallback = useEvent((el) => {
    if (el) {
      columnRefList.current[el.getColumnIndex()] = el
    }
  })

  const handleColumnChange = useEvent((index: number, columnIndex: number) => {
    const options = columnRefList.current.map((column) => column.getOption())

    onColumnChange?.(columnIndex, options[index], index)

    const allDone = Object.keys(columnAnimating.current).every(
      (key) => !columnAnimating.current[key],
    )

    if (allDone) {
      const values = options.map((option) => option[mergedFieldNames.value])

      if (!arrayEqual(values, innerValue)) {
        setInnerValue(values, options)
      }
    }
  })

  const handlePickStart = useEvent((columnIndex: number) => {
    columnAnimating.current[columnIndex] = true
  })

  const handlePickEnd = useEvent((columnIndex: number) => {
    columnAnimating.current[columnIndex] = false
  })

  const getOptions = useEvent(() => {
    return columnRefList.current.map((col) => col.getOption())
  })

  const pickImmediately = useEvent(() => {
    return columnRefList.current.map((col) => col.pickImmediately())
  })

  const setIndexesForcibly = useEvent((indexes: number[]) => {
    return columnRefList.current.map((col, i) =>
      col.setIndexForcibly(indexes[i]),
    )
  })

  useImperativeHandle(ref, () => ({
    getOptions,
    pickImmediately,
    setIndexesForcibly,
  }))

  const pickerClass = classNames('s-picker', className)

  return (
    <div {...restProps} className={pickerClass} style={style}>
      <div className="s-picker-column-group">
        {columns.map((column, columnIndex) => {
          return (
            <PickerColumn
              key={columnIndex}
              ref={refCallback}
              itemHeight={itemHeight}
              focusHeight={focusHeight}
              column={column}
              columnIndex={columnIndex}
              fieldNames={mergedFieldNames}
              onChange={handleColumnChange}
              onPickStart={handlePickStart}
              onPickEnd={handlePickEnd}
            ></PickerColumn>
          )
        })}
      </div>
    </div>
  )
})

export default Picker
