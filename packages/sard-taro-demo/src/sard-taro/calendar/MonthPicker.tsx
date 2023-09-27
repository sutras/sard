import { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { useEvent } from '../use'
import Popout from '../popout'
import DatetimePicker from '../datetime-picker'

export interface MonthPickerProps {
  minDate: Date
  maxDate: Date
  defaultValue: Date
  onConfirm: (date: Date) => void
}

export interface MonthPickerRef {
  setValue: (value: Date) => void
  setVisible: (visible: boolean) => void
}

export const MonthPicker = memo(
  forwardRef<MonthPickerRef, MonthPickerProps>((props, ref) => {
    const { minDate, maxDate, defaultValue, onConfirm } = props

    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const handlePickerConfirm = useEvent(() => {
      onConfirm(value)
    })

    useImperativeHandle(
      ref,
      () => ({
        setValue,
        setVisible,
      }),
      [],
    )

    return (
      <Popout
        visible={visible}
        onVisible={setVisible}
        type="compact"
        onConfirm={handlePickerConfirm}
      >
        <DatetimePicker
          type="yM"
          min={minDate}
          max={maxDate}
          value={value}
          onChange={setValue}
        />
      </Popout>
    )
  }),
  (oldProps, newProps) => {
    return (
      oldProps.minDate === newProps.minDate &&
      oldProps.maxDate === newProps.maxDate
    )
  },
)

export default MonthPicker
