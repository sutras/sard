import { useEffect, useRef, useState } from 'react'
import {
  Button,
  DatetimePicker,
  Form,
  PopoutInput,
  Tabs,
  Toast,
  formatDate,
  useEvent,
} from 'sard-taro'

const config = {
  rules: [
    { type: 'object' as const, required: true, message: 'Please select time!' },
  ],
}

const rangeConfig = {
  rules: [
    { type: 'array' as const, required: true, message: 'Please select time!' },
  ],
}

interface RangePickerProps {
  value?: [Date, Date]
  onChange?: (value: [Date, Date]) => void
  type?: string
  onOutletChange?: (outletValue, isManual: boolean) => void
}

function RangePicker({
  type,
  value,
  onChange,
  onOutletChange,
}: RangePickerProps) {
  const [startValue, setStartValue] = useState<Date>()
  const [endValue, setEndValue] = useState<Date>()

  const isManual = useRef(false)

  const startOutletValue = useRef('')
  const endOutletValue = useRef('')

  const handleStartChange = useEvent((value: Date) => {
    setStartValue(value)
    isManual.current = true
  })
  const handleEndChange = useEvent((value: Date) => {
    setEndValue(value)
    isManual.current = true
  })

  useEffect(() => {
    if (startValue && endValue) {
      onChange?.([startValue, endValue])
    }
  }, [startValue, endValue])

  useEffect(() => {
    if (value) {
      setStartValue(value[0])
      setEndValue(value[1])
    }

    if (onOutletChange) {
      if (value) {
        onOutletChange(
          [startOutletValue.current, endOutletValue.current].join(' 至 '),
          isManual.current,
        )
        isManual.current = false
      } else {
        onOutletChange('', false)
      }
    }
  }, [value])

  return (
    <Tabs scrollCount={0} animated>
      <Tabs.Pane label="开始">
        <DatetimePicker
          value={startValue}
          onChange={handleStartChange}
          type={type}
          onOutletChange={(value) => (startOutletValue.current = value)}
        />
      </Tabs.Pane>
      <Tabs.Pane label="结束">
        <DatetimePicker
          value={endValue}
          onChange={handleEndChange}
          type={type}
          onOutletChange={(value) => (endOutletValue.current = value)}
        />
      </Tabs.Pane>
    </Tabs>
  )
}

const onFinish = (values) => {
  const rangeValue = values['range-picker']
  const rangeTimeValue = values['range-time-picker']
  const formattedValues = {
    ...values,
    'date-picker': formatDate(values['date-picker'], 'YYYY-MM-DD'),
    'date-time-picker': formatDate(
      values['date-time-picker'],
      'YYYY-MM-DD HH:mm:ss',
    ),
    'month-picker': formatDate(values['month-picker'], 'YYYY-MM'),
    'range-picker': [
      formatDate(rangeValue[0], 'YYYY-MM-DD'),
      formatDate(rangeValue[1], 'YYYY-MM-DD'),
    ],
    'range-time-picker': [
      formatDate(rangeTimeValue[0], 'YYYY-MM-DD HH:mm:ss'),
      formatDate(rangeTimeValue[1], 'YYYY-MM-DD HH:mm:ss'),
    ],
    'time-picker': formatDate(values['time-picker'], 'HH:mm:ss'),
  }
  console.log('处理后的表单值: ', formattedValues)
}

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
    onFinish(values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  return (
    <Form
      onSuccess={handleSuccess}
      onFail={handleFail}
      form={form}
      labelWidth={100}
    >
      <Form.Field name="date-picker" label="DatePicker" {...config}>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="yMd" />
        </PopoutInput>
      </Form.Field>

      <Form.Field
        name="date-time-picker"
        label="DatePicker [showTime]"
        {...config}
      >
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="yMdhms" />
        </PopoutInput>
      </Form.Field>

      <Form.Field name="month-picker" label="MonthPicker" {...config}>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="yM" />
        </PopoutInput>
      </Form.Field>

      <Form.Field name="range-picker" label="RangePicker" {...rangeConfig}>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <RangePicker type="yMd" />
        </PopoutInput>
      </Form.Field>

      <Form.Field
        name="range-time-picker"
        label="RangePicker [showTime]"
        {...rangeConfig}
      >
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <RangePicker type="yMdhms" />
        </PopoutInput>
      </Form.Field>

      <Form.Field name="time-picker" label="TimePicker" {...config}>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="hms" />
        </PopoutInput>
      </Form.Field>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '时间类控件'

export default App
