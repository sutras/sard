import {
  useRef,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
  ReactNode,
} from 'react'
import { Picker, PickerRef } from '../picker'
import { useEvent, useControllableValue, useLayoutUpdateEffect } from '../use'
import { formatDate, getDaysInMonth, minmax } from '../utils'
import { AnyFunction, BaseProps } from '../base'
import useTranslate from '../locale/useTranslate'
import Popout, { PopoutProps } from '../popout'
import CustomWrapper from '../custom-wrapper'

export type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'

export interface DatetimeColumnOption {
  value: number
  label?: ReactNode
  zerofill?: string
  [key: PropertyKey]: any
}

export type DatetimePickerRef = {
  getValueForcibly: () => Date
}

export type DateEvery = [number, number, number, number, number, number]

const getMinDate = () => {
  return new Date(new Date().getFullYear() - 10, 0, 1, 0, 0, 0)
}

const getMaxDate = () => {
  return new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59)
}

interface Strategies {
  [p: string]: [
    index: number,
    length: number,
    min: number | null,
    max: number | null,
    getter: (date: Date) => number,
    setter: (date: Date, value: number) => number,
  ]
}

const strategies: Strategies = {
  y: [0, 4, 0, 0, (d) => d.getFullYear(), (d, val) => d.setFullYear(val)],
  M: [1, 2, 1, 12, (d) => d.getMonth() + 1, (d, val) => d.setMonth(val - 1)],
  d: [2, 2, 1, 31, (d) => d.getDate(), (d, val) => d.setDate(val)],
  h: [3, 2, 0, 23, (d) => d.getHours(), (d, val) => d.setHours(val)],
  m: [4, 2, 0, 59, (d) => d.getMinutes(), (d, val) => d.setMinutes(val)],
  s: [5, 2, 0, 59, (d) => d.getSeconds(), (d, val) => d.setSeconds(val)],
}

const letterArray: DatetimeLetter[] = ['y', 'M', 'd', 'h', 'm', 's']

function getBoundaryValue(isMax: boolean, endDate: Date, currentDate: Date) {
  const currEvery = [endDate.getFullYear()]
  const minOrMaxIndex = isMax ? 3 : 2
  let aside = true
  let prevGetter = strategies.y[4]

  letterArray.slice(1).forEach((letter, index) => {
    const strategy = strategies[letter]
    let minOrMax = strategy[minOrMaxIndex] as number
    if (isMax && letter === 'd') {
      minOrMax = getDaysInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
      )
    }
    aside = aside && currEvery[index] === prevGetter(currentDate)

    currEvery[index + 1] = aside ? strategy[4](endDate) : minOrMax
    prevGetter = strategy[4]
  })

  return currEvery
}

function correctDate(date: DateEvery, minDate: Date, maxDate: Date) {
  let minAside = true
  let maxAside = true

  let prevGetter = strategies.y[4]
  letterArray.slice(1).forEach((letter, index) => {
    const strategy = strategies[letter]
    let minValue = strategy[2] as number
    let maxValue = strategy[3] as number
    if (letter === 'd') {
      maxValue = getDaysInMonth(date[0], date[1] - 1)
    }

    const currGetter = strategy[4]
    if ((minAside = minAside && prevGetter(minDate) === date[index])) {
      minValue = currGetter(minDate)
    }
    if ((maxAside = maxAside && prevGetter(maxDate) === date[index])) {
      maxValue = currGetter(maxDate)
    }
    date[index + 1] = minmax(date[index + 1], minValue, maxValue)

    prevGetter = currGetter
  })
}

const getColumnData = (
  count: number,
  start: number,
  length: number,
  letter: DatetimeLetter,
  currentDate: Date,
  translate: AnyFunction,
  filter?: (
    letter: DatetimeLetter,
    value: number,
    date: Date,
    index: number,
  ) => boolean,
  formatter?: (
    letter: DatetimeLetter,
    option: DatetimeColumnOption,
    date: Date,
    index: number,
  ) => ReactNode,
) => {
  let column = Array(count)
    .fill(0)
    .map(
      (_, i) =>
        ({
          value: i + start,
        } as DatetimeColumnOption),
    )

  if (filter) {
    column = column.filter((option, i) =>
      filter(letter, option.value, currentDate, i),
    )
  }
  column.forEach((option) => {
    option.zerofill = String(option.value).padStart(length, '0')
    option.label = option.zerofill + translate(letter)
  })
  if (formatter) {
    column.forEach((option, i) => {
      option.label = formatter(letter, option, currentDate, i)
    })
  }
  return column
}

export interface DatetimePickerProps extends BaseProps {
  type?: string
  min?: Date
  max?: Date
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
  filter?: (
    letter: DatetimeLetter,
    value: number,
    date: Date,
    index: number,
  ) => boolean
  formatter?: (
    letter: DatetimeLetter,
    option: DatetimeColumnOption,
    date: Date,
    index: number,
  ) => ReactNode
  withPopout?: boolean
  popoutProps?: PopoutProps
  outletFormatter?: (type: string, date?: Date) => string
}

export interface DatetimePickerFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<DatetimePickerProps> & RefAttributes<DatetimePickerRef>
  > {
  alwaysHasValue: boolean
  outletFormatter: typeof outletFormatter
  defaultOutletFormatter: typeof defaultOutletFormatter
}

const mapLetterFullname = {
  y: 'YYYY',
  M: 'MM',
  d: 'DD',
  h: 'HH',
  m: 'mm',
  s: 'ss',
}

function defaultOutletFormatter(type: string, date?: Date) {
  if (!date) {
    return ''
  }
  const letters = type.split('')
  const dateLetter: string[] = []
  const timeLetter: string[] = []
  'yMd'.split('').forEach((letter) => {
    if (letters.includes(letter)) {
      dateLetter.push(letter)
    }
  })
  'hms'.split('').forEach((letter) => {
    if (letters.includes(letter)) {
      timeLetter.push(letter)
    }
  })
  const dateTemplate = dateLetter
    .map((letter) => mapLetterFullname[letter])
    .join('-')
  const timeTemplate = timeLetter
    .map((letter) => mapLetterFullname[letter])
    .join(':')

  return formatDate(
    date,
    [dateTemplate, timeTemplate].filter(Boolean).join(' '),
  )
}

function outletFormatter(props: DatetimePickerProps, value?: Date) {
  const formatter =
    props.outletFormatter ?? DatetimePicker.defaultOutletFormatter
  return formatter(props.type || 'yMd', value)
}

export const DatetimePicker = forwardRef<
  DatetimePickerRef,
  DatetimePickerProps
>((props, ref) => {
  const { t } = useTranslate('datetimePicker')

  const {
    type = 'yMd',
    min,
    max,
    value,
    defaultValue,
    onChange,
    filter,
    formatter,
    withPopout,
    popoutProps,
    outletFormatter,
    ...restProps
  } = props

  void outletFormatter

  const innerType = useMemo<DatetimeLetter[]>(() => {
    return type.split('') as DatetimeLetter[]
  }, [type])

  const minDate = useMemo(() => min || getMinDate(), [min])

  const maxDate = useMemo(() => {
    const maxDate = max || getMaxDate()
    return maxDate < minDate ? new Date(minDate) : maxDate
  }, [max])

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => new Date(),
    postValue: (value) => {
      value = value ?? new Date()

      return value.getTime() < minDate.getTime()
        ? minDate
        : value.getTime() > maxDate.getTime()
        ? maxDate
        : value
    },
  })

  const pickerValue = useMemo(() => {
    return innerType.map((letter) => {
      return strategies[letter][4](innerValue)
    })
  }, [innerValue, innerType])

  const pickerRef = useRef<PickerRef>(null)
  const columnsMap = useRef<{ [p: string]: DatetimeColumnOption[] }>({})

  const minValuesRef = useRef<number[]>([])
  const maxValuesRef = useRef<number[]>([])

  const createColumnData = (types: DatetimeLetter[], currentDate: Date) => {
    minValuesRef.current = getBoundaryValue(false, minDate, currentDate)
    maxValuesRef.current = getBoundaryValue(true, maxDate, currentDate)

    const getColumnDataByType = (letter: DatetimeLetter) => {
      const strategy = strategies[letter]
      const index = strategy[0]

      return getColumnData(
        maxValuesRef.current[index] - minValuesRef.current[index] + 1,
        minValuesRef.current[index],
        strategy[1],
        letter,
        currentDate,
        t,
        filter,
        formatter,
      )
    }

    return types.map(
      (letter) =>
        (columnsMap.current[letter] = getColumnDataByType(
          letter as DatetimeLetter,
        )),
    )
  }

  const [columns, setColumns] = useState<DatetimeColumnOption[][]>(() =>
    createColumnData(innerType, innerValue),
  )

  const getChangedLetter = (currentDate: Date) => {
    const minValues = getBoundaryValue(false, minDate, currentDate)
    const maxValues = getBoundaryValue(true, maxDate, currentDate)

    return letterArray.filter(
      (_, i) =>
        minValues[i] !== minValuesRef.current[i] ||
        maxValues[i] !== maxValuesRef.current[i],
    )
  }

  const updateColumns = useEvent((currentDate: Date) => {
    const changedLetter = getChangedLetter(currentDate)

    if (changedLetter.length) {
      const changedColumns = createColumnData(changedLetter, currentDate)
      const columns = innerType.map((letter) => {
        for (let i = 0, l = changedLetter.length; i < l; i++) {
          if (changedLetter[i] === letter) {
            return changedColumns[i]
          }
        }
        return columnsMap.current[letter]
      })

      setColumns(columns)
    }
  })

  const getDateByPickerValue = useEvent((value: number[]) => {
    const currEvery = letterArray.map((letter) => {
      const stratery = strategies[letter]
      for (let i = 0, l = innerType.length; i < l; i++) {
        if (innerType[i] === letter) {
          return value[i]
        }
      }
      return stratery[4](innerValue)
    })
    correctDate(currEvery as DateEvery, minDate, maxDate)

    currEvery[1]--
    const date = new Date(...(currEvery as DateEvery))

    updateColumns(date)

    return date
  })

  const handleChange = useEvent((value: number[]) => {
    const nextDate = getDateByPickerValue(value)
    setInnerValue(nextDate)
  })

  useLayoutUpdateEffect(() => {
    if (value !== undefined) {
      updateColumns(innerValue)
    }
  }, [value])

  const getValueForcibly = useEvent(() => {
    const value = (pickerRef.current as PickerRef).getValueForcibly()

    return getDateByPickerValue(value as number[])
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
        <Picker
          {...restProps}
          columns={columns}
          value={pickerValue}
          onChange={handleChange}
          ref={pickerRef}
        />
      </CustomWrapper>
    )
  }

  if (withPopout) {
    return <Popout {...popoutProps}>{renderElement()}</Popout>
  }

  return renderElement()
}) as DatetimePickerFC

DatetimePicker.alwaysHasValue = true
DatetimePicker.outletFormatter = outletFormatter
DatetimePicker.defaultOutletFormatter = defaultOutletFormatter

export default DatetimePicker
