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

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
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
          prepend={<Icon prefix="demo-icon" name="person" />}
          placeholder="Username"
        />
      </Form.Field>
      <Form.Field
        underline={false}
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prepend={<Icon prefix="demo-icon" name="key" />}
          type="password"
          placeholder="Password"
        />
      </Form.Field>
      <Form.Field underline={false}>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Field name="remember" valuePropName="checked" unstyled>
            <Checkbox>Remember me</Checkbox>
          </Form.Field>

          <View style={{ color: 'var(--sar-primary)' }}>Forgot password</View>
        </View>
      </Form.Field>

      <Form.Field>
        <Space vertical>
          <Button block formType="submit">
            Log in
          </Button>
          <Space>
            Or
            <View style={{ color: 'var(--sar-primary)' }}>register now!</View>
          </Space>
        </Space>
      </Form.Field>
    </Form>
  )
}

App.title = '复杂一点的登录栏'

export default App
