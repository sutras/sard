import {
  CSSProperties,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { useInertRef, useEvent } from '../../use'

import {
  PickerColumn,
  PickerColumnExternalProps,
  PickerColumnOption,
  PickerColumnRef,
  FieldNames,
} from './Column'
import { arrayEqual } from '../../utils'

export * from './Column'

export interface PickerPrivateProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  columns?: PickerColumnOption[][]
  defaultIndex?: number[]
  onChange?: (
    value: any[],
    pickedOptions: PickerColumnOption[],
    pickedIndexes: number[],
  ) => void
  onColumnChange?: (columnIndex: number, index: number) => void
  fieldNames?: FieldNames
}

export type PickerProps = PickerPrivateProps & PickerColumnExternalProps

export interface PickerRef {
  getIndexes: () => number[]
  getOptions: () => PickerColumnOption[]
  setIndexes: (
    indexes: number[],
    emitChange?: boolean,
    animated?: boolean,
  ) => void
  setIndexesByValue: (
    values: any[],
    emitChange?: boolean,
    animated?: boolean,
  ) => void
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
    height,
    focusHeight,
    duration,
    correctDuration,
    damping,
    inertiaTime,
    fieldNames,

    // picker props
    className,
    style,
    columns = [],
    defaultIndex = [],
    onChange,
    onColumnChange,
    ...restProps
  } = props

  const tempIndexes = useRef<number[]>([])
  const currentIndexes = useInertRef(() => {
    const indexes = columns.map((_, i) => defaultIndex[i] || 0)
    tempIndexes.current = indexes.slice()
    return indexes
  })

  const fieldKeys = useMemo(() => {
    return Object.assign({}, defaultFieldNames, fieldNames)
  }, [fieldNames])

  const columnImperativeList = useRef<PickerColumnRef[]>([])

  const columnAnimating = useRef<{ [p: string]: boolean }>({})

  const refHandle = useEvent((el) => {
    if (el) {
      columnImperativeList.current[el.getColumnIndex()] = el
    }
  })

  const handleChange = useEvent((columnIndex: number, index: number) => {
    tempIndexes.current = columnImperativeList.current.map((column) =>
      column.getIndex(),
    )

    onColumnChange?.(columnIndex, index)

    const allDone = Object.keys(columnAnimating.current).every(
      (key) => !columnAnimating.current[key],
    )

    if (allDone && !arrayEqual(tempIndexes.current, currentIndexes.current)) {
      currentIndexes.current = tempIndexes.current.slice()

      const pickedOptions = columns.map(
        (column, i) => column[currentIndexes.current[i]],
      )

      onChange?.(
        pickedOptions.map((option) => option[fieldKeys.value]),
        pickedOptions,
        currentIndexes.current.slice(),
      )
    }
  })

  const handlePickStart = useEvent((columnIndex: number) => {
    columnAnimating.current[columnIndex] = true
  })

  const handlePickEnd = useEvent((columnIndex: number) => {
    columnAnimating.current[columnIndex] = false
  })

  const getIndexes = useEvent(() => {
    return currentIndexes.current.slice()
  })

  const getOptions = useEvent(() =>
    columnImperativeList.current.map((col) => col.getOption()),
  )

  const setIndexes = useEvent(
    (indexes: number[], emitChange?: boolean, animated?: boolean) => {
      columnImperativeList.current.forEach((col, i) =>
        col.setIndex(indexes[i], emitChange, animated),
      )
    },
  )

  const setIndexesByValue = useEvent(
    (values: any[], emitChange?: boolean, animated?: boolean) => {
      columnImperativeList.current.forEach((col, i) =>
        col.setIndexByValue(values[i], emitChange, animated),
      )
    },
  )

  const setIndexesForcibly = useEvent((indexes: number[]) => {
    columnImperativeList.current.forEach((col, i) =>
      col.setIndexForcibly(indexes[i]),
    )
  })

  useImperativeHandle(ref, () => ({
    setIndexes,
    setIndexesByValue,
    setIndexesForcibly,
    getIndexes,
    getOptions,
  }))

  const pickerClass = classNames('s-picker', className)

  return (
    <div {...restProps} className={pickerClass} style={style}>
      <div className="s-picker-column-group">
        {columns.map((column, columnIndex) => {
          return (
            <PickerColumn
              key={columnIndex}
              ref={refHandle}
              height={height}
              focusHeight={focusHeight}
              duration={duration}
              correctDuration={correctDuration}
              damping={damping}
              inertiaTime={inertiaTime}
              column={column}
              columnIndex={columnIndex}
              defaultIndex={defaultIndex[columnIndex]}
              fieldNames={fieldKeys}
              onChange={handleChange}
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
