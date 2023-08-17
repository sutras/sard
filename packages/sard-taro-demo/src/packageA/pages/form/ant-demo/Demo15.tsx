import { useEffect, useState } from 'react'
import { Button, Form, Icon, Input, Toast } from 'sard-taro'

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
    <Form form={form} onSuccess={handleSuccess} onFail={handleFail}>
      <Form.Field
        underline={false}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prepend={<Icon prefix="demo-icon" name="person" />}
          placeholder="Username"
        />
      </Form.Field>
      <Form.Field
        underline={false}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prepend={<Icon prefix="demo-icon" name="key" />}
          type="password"
          placeholder="Password"
        />
      </Form.Field>

      <Form.Field underline={false}>
        {() => {
          const [disabled, setDisabled] = useState(false)

          const values = Form.useWatch([])

          useEffect(() => {
            form
              .validate({ validateOnly: true })
              .then(() => setDisabled(false))
              .catch(() => setDisabled(true))
          }, [values])

          return (
            <Button block formType="submit" disabled={disabled}>
              Log in
            </Button>
          )
        }}
      </Form.Field>
    </Form>
  )
}

App.title = '登录栏'

export default App
