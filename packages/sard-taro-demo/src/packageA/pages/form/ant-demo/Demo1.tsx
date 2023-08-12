import { Button, Checkbox, Form, Input, Toast } from 'sard-taro'

function App() {
  const handleSuccess = (values) => {
    Toast.show('success')
    console.log('Success:', values)
  }

  const handleFail = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      initialValues={{ remember: true }}
      onSuccess={handleSuccess}
      onFail={handleFail}
    >
      <Form.Field
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input inlaid placeholder="Username" />
      </Form.Field>

      <Form.Field
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input inlaid type="password" placeholder="Password" />
      </Form.Field>

      <Form.Field label name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Field>

      <Form.Field underline={false}>
        <Button block formType="submit">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

App.title = '基本使用'

export default App
