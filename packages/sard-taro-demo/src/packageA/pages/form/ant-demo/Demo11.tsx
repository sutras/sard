import { Button, Form, Input, Stepper, Toast } from 'sard-taro'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onFail={handleFail}
      validateMessages={validateMessages}
    >
      <Form.Map name="user">
        <Form.Field name="name" label="Name" rules={[{ required: true }]}>
          <Input inlaid placeholder="请输入" />
        </Form.Field>
        <Form.Field name="email" label="Email" rules={[{ type: 'email' }]}>
          <Input inlaid placeholder="请输入" />
        </Form.Field>
        <Form.Field
          name="age"
          label="Age"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <Stepper />
        </Form.Field>
        <Form.Field name="website" label="Website">
          <Input inlaid placeholder="请输入" />
        </Form.Field>
        <Form.Field name="introduction" label="Introduction">
          <Input inlaid placeholder="请输入" type="textarea" />
        </Form.Field>
      </Form.Map>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '嵌套结构与校验信息'

export default App
