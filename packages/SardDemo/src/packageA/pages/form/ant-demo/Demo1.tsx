import { Button, Checkbox, FooterBar, Form, Input, Toast } from 'sard'

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

      <FooterBar showLine={false}>
        <Button formType="submit" style={{ flexGrow: 1 }}>
          Submit
        </Button>
      </FooterBar>
    </Form>
  )
}

App.title = '基本使用'

export default App
