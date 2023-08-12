import { Form, Input, Stepper, Toast } from 'sard-taro'

function App() {
  const [form] = Form.useForm()
  const nameValue = Form.useWatch(['name'], form)

  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onSuccess={handleSuccess}
      onFail={handleFail}
    >
      <Form.Field
        name="name"
        initialValue="abc123"
        label="Name (Watch to trigger rerender)"
      >
        <Input inlaid placeholder="请输入" />
      </Form.Field>
      <Form.Field name="age" label="Age (Not Watch)">
        <Stepper />
      </Form.Field>
      <Form.Field>Name Value: {nameValue}</Form.Field>
    </Form>
  )
}

App.title = '字段监听 Hooks'

export default App
