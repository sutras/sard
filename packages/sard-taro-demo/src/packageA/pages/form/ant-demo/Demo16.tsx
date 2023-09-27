import { View } from '@tarojs/components'
import { Button, Checkbox, Form, Icon, Input, Space, Toast } from 'sard-taro'

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
      onSuccess={handleSuccess}
      onFail={handleFail}
      initialValues={{ remember: true }}
    >
      <Form.Field
        underline={false}
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prepend={<Icon family="demo-icons" name="person" />}
          placeholder="Username"
        />
      </Form.Field>
      <Form.Field
        underline={false}
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prepend={<Icon family="demo-icons" name="key" />}
          type="password"
          placeholder="Password"
        />
      </Form.Field>
      <Form.Field underline={false}>
        <Space direction="horizontal" justify="between" align="center">
          <Form.Field name="remember" valuePropName="checked" unstyled>
            <Checkbox>Remember me</Checkbox>
          </Form.Field>

          <View style={{ color: 'tomato' }}>Forgot password</View>
        </Space>
      </Form.Field>

      <Form.Field>
        <Space>
          <Button formType="submit">Log in</Button>
          <Space direction="horizontal">
            Or
            <View style={{ color: 'tomato' }}>register now!</View>
          </Space>
        </Space>
      </Form.Field>
    </Form>
  )
}

App.title = '复杂一点的登录栏'

export default App
