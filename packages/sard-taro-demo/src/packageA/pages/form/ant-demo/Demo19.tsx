import {
  Button,
  DatetimePicker,
  Form,
  PopoutInput,
  Toast,
  formatDate,
} from 'sard-taro'

const config = {
  rules: [
    { type: 'object' as const, required: true, message: 'Please select time!' },
  ],
}

const onFinish = (values) => {
  const formattedValues = {
    ...values,
    'date-picker': formatDate(values['date-picker'], 'YYYY-MM-DD'),
    'month-picker': formatDate(values['month-picker'], 'YYYY-MM'),
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

      <Form.Field name="month-picker" label="MonthPicker" {...config}>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <DatetimePicker type="yM" />
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
